import { redactUrl, ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";

const DEFAULT_BASE_URL = "https://api.goshippo.com";
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 300;
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_BACKOFF_MS = 60_000;
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
/** Methods that are safe to repeat after an ambiguous failure (RFC 9110 §9.2.2). */
const IDEMPOTENT_METHODS = new Set<HttpMethod>(["GET", "PUT", "DELETE"]);

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ShippoClientOptions {
  /** Shippo API token, sent as `Authorization: ShippoToken <apiKey>`. */
  apiKey: string;
  /** Defaults to `https://api.goshippo.com`. Override for testing or a proxy. */
  baseUrl?: string;
  /**
   * Optional dated API version (e.g. `2018-02-08`), sent as the
   * `shippo-api-version` header. Shippo defaults to the account's version
   * when omitted.
   */
  apiVersion?: string;
  /** Injectable fetch implementation — defaults to the global `fetch`. */
  fetch?: typeof fetch;
  /**
   * Max retry attempts. Default 2. GET/PUT/DELETE are retried on network
   * errors, timeouts, and 429/5xx. POST/PATCH (label purchases, refunds,
   * pickups, ...) are only retried on 429, since a timeout or 5xx may
   * arrive after Shippo already acted. Must be a non-negative integer.
   */
  maxRetries?: number;
  /**
   * Also retry POST/PATCH on network errors and 5xx. Off by default because
   * Shippo documents no idempotency key: a retried `transactions.create`
   * can buy the label more than once.
   */
  retryNonIdempotent?: boolean;
  /** Base delay for exponential backoff between retries, in ms. Default 300. Must be finite and >= 0. */
  retryDelayMs?: number;
  /** Per-request timeout in ms, aborting the request if exceeded. Default 30000. Must be finite and > 0. */
  timeoutMs?: number;
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined> | undefined;
  body?: unknown;
  signal?: AbortSignal | undefined;
}

export class ShippoClient {
  readonly baseUrl: string;

  #origin: string;
  #apiKey: string;
  #apiVersion: string | undefined;
  #fetch: typeof fetch;
  #maxRetries: number;
  #retryNonIdempotent: boolean;
  #retryDelayMs: number;
  #timeoutMs: number;

  constructor(options: ShippoClientOptions) {
    if (!options.apiKey) {
      throw new ShippoError("Shippo client requires a non-empty apiKey.");
    }

    this.#apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.#origin = parseBaseOrigin(this.baseUrl);
    this.#apiVersion = options.apiVersion;
    this.#fetch = options.fetch ?? fetch;
    this.#maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.#retryNonIdempotent = options.retryNonIdempotent ?? false;
    this.#retryDelayMs = options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
    this.#timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    if (!Number.isInteger(this.#maxRetries) || this.#maxRetries < 0) {
      throw new ShippoError(
        `Invalid maxRetries ${String(this.#maxRetries)}: expected a non-negative integer.`,
      );
    }
    if (!Number.isFinite(this.#retryDelayMs) || this.#retryDelayMs < 0) {
      throw new ShippoError(
        `Invalid retryDelayMs ${String(this.#retryDelayMs)}: expected a finite number >= 0.`,
      );
    }
    if (!Number.isFinite(this.#timeoutMs) || this.#timeoutMs <= 0) {
      throw new ShippoError(
        `Invalid timeoutMs ${String(this.#timeoutMs)}: expected a finite number > 0.`,
      );
    }
  }

  async request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
    const url = this.#buildUrl(path, options.query);

    for (let attempt = 0; ; attempt++) {
      if (options.signal?.aborted) {
        throw callerAbortError(options.signal, url, attempt);
      }
      try {
        return await this.#attempt<T>(method, url, options, attempt);
      } catch (error) {
        if (!this.#shouldRetry(method, error, attempt, options.signal)) {
          throw error;
        }
        try {
          await sleep(this.#backoffDelayMs(attempt, error), options.signal);
        } catch {
          throw callerAbortError(options.signal, url, attempt + 1);
        }
      }
    }
  }

  async #attempt<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions,
    attempt: number,
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `ShippoToken ${this.#apiKey}`,
      Accept: "application/json",
    };
    if (this.#apiVersion) {
      headers["shippo-api-version"] = this.#apiVersion;
    }
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const timeoutSignal = AbortSignal.timeout(this.#timeoutMs);
    const signal = options.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal;

    let response: Response;
    try {
      response = await this.#fetch(url, {
        method,
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        // Never follow redirects: whether `Authorization` is stripped on a
        // cross-origin hop depends on the runtime. A 3xx surfaces as a
        // `ShippoApiError` instead.
        redirect: "manual",
        signal,
      });
    } catch (cause) {
      if (options.signal?.aborted) {
        throw callerAbortError(options.signal, url, attempt);
      }
      throw new ShippoNetworkError(networkErrorMessage(cause, url, attempt), { cause });
    }

    if (!response.ok) {
      throw await toApiError(response, url);
    }

    return parseSuccessBody<T>(response);
  }

  /**
   * Resolves `path` to a full URL on the configured origin. The API token is
   * attached to every request, so anything that would land on a different
   * scheme, host, or port (an absolute URL, `@host`, `.host`, a pagination
   * `next` link pointing elsewhere) is rejected before `fetch` is called.
   */
  #buildUrl(path: string, query: RequestOptions["query"]): string {
    let url: URL;
    try {
      url = new URL(path.startsWith("/") ? `${this.baseUrl}${path}` : path);
    } catch (cause) {
      throw new ShippoError(
        `Invalid request path ${JSON.stringify(path)}: expected a path starting with "/" ` +
          `or an absolute URL on ${this.#origin}.`,
        { cause },
      );
    }
    if (url.origin !== this.#origin) {
      throw new ShippoError(
        `Refusing to send the Shippo API token to ${url.origin}: request path ` +
          `${JSON.stringify(path)} is not on the configured origin ${this.#origin}.`,
      );
    }
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  #shouldRetry(
    method: HttpMethod,
    error: unknown,
    attempt: number,
    signal: AbortSignal | undefined,
  ): boolean {
    if (signal?.aborted || attempt >= this.#maxRetries) {
      return false;
    }
    const repeatable = IDEMPOTENT_METHODS.has(method) || this.#retryNonIdempotent;
    if (error instanceof ShippoNetworkError) {
      return repeatable;
    }
    if (error instanceof ShippoApiError) {
      // A 429 means Shippo rejected the request without acting on it, so it is
      // safe to repeat for any method.
      return error.status === 429 || (repeatable && RETRYABLE_STATUS_CODES.has(error.status));
    }
    return false;
  }

  #backoffDelayMs(attempt: number, error: unknown): number {
    if (error instanceof ShippoApiError && error.retryAfterMs !== undefined) {
      return Math.min(error.retryAfterMs, MAX_BACKOFF_MS);
    }
    const exponential = this.#retryDelayMs * 2 ** attempt;
    const jitter = Math.random() * this.#retryDelayMs;
    return Math.min(exponential + jitter, MAX_BACKOFF_MS);
  }
}

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Validates `baseUrl` and returns its origin. Plain `http://` is only
 * allowed for loopback hosts so a live key isn't sent in cleartext by mistake.
 */
function parseBaseOrigin(baseUrl: string): string {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch (cause) {
    throw new ShippoError(`Invalid baseUrl ${JSON.stringify(baseUrl)}: not a valid URL.`, {
      cause,
    });
  }
  const isLoopbackHttp = url.protocol === "http:" && LOOPBACK_HOSTNAMES.has(url.hostname);
  if (url.protocol !== "https:" && !isLoopbackHttp) {
    throw new ShippoError(
      `Invalid baseUrl ${JSON.stringify(baseUrl)}: must use https:// ` +
        `(http:// is only allowed for localhost, 127.0.0.1, or [::1]).`,
    );
  }
  return url.origin;
}

async function toApiError(response: Response, url: string): Promise<ShippoApiError> {
  const body = await parseBody(response);
  return new ShippoApiError({
    status: response.status,
    statusText: response.statusText,
    body,
    requestId: response.headers.get("x-request-id") ?? undefined,
    retryAfterMs: parseRetryAfterMs(response.headers.get("retry-after")),
    url,
  });
}

async function parseSuccessBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }
  const body = await parseBody(response);
  return body as T;
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();
  if (text.length === 0) {
    return undefined;
  }
  if (!contentType.includes("application/json")) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Handles both forms the HTTP spec allows: delay-seconds or an HTTP-date. */
function parseRetryAfterMs(header: string | null): number | undefined {
  if (!header) {
    return undefined;
  }
  const seconds = Number(header);
  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1000);
  }
  const dateMs = Date.parse(header);
  if (!Number.isNaN(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }
  return undefined;
}

function networkErrorMessage(cause: unknown, url: string, attempt: number): string {
  const reason = cause instanceof Error ? cause.message : String(cause);
  return `Shippo API request to ${redactUrl(url)} failed on attempt ${attempt + 1}: ${reason}`;
}

function callerAbortError(
  signal: AbortSignal | undefined,
  url: string,
  attempt: number,
): ShippoNetworkError {
  return new ShippoNetworkError(
    `Shippo API request to ${url} was aborted by the caller before attempt ${attempt + 1} completed.`,
    { cause: signal?.reason },
  );
}

/** Resolves after `ms`; rejects immediately if `signal` aborts first. */
function sleep(ms: number, signal: AbortSignal | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
