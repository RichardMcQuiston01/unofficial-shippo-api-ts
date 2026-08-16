import { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";

const DEFAULT_BASE_URL = "https://api.goshippo.com";
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 300;
const DEFAULT_TIMEOUT_MS = 30_000;
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

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
  /** Max retry attempts for network errors and 429/5xx responses. Default 2. */
  maxRetries?: number;
  /** Base delay for exponential backoff between retries, in ms. Default 300. */
  retryDelayMs?: number;
  /** Per-request timeout in ms, aborting the request if exceeded. Default 30000. */
  timeoutMs?: number;
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined> | undefined;
  body?: unknown;
  signal?: AbortSignal | undefined;
}

export class ShippoClient {
  readonly baseUrl: string;

  #apiKey: string;
  #apiVersion: string | undefined;
  #fetch: typeof fetch;
  #maxRetries: number;
  #retryDelayMs: number;
  #timeoutMs: number;

  constructor(options: ShippoClientOptions) {
    if (!options.apiKey) {
      throw new ShippoError("Shippo client requires a non-empty apiKey.");
    }

    this.#apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.#apiVersion = options.apiVersion;
    this.#fetch = options.fetch ?? fetch;
    this.#maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.#retryDelayMs = options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
    this.#timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  async request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
    const url = this.#buildUrl(path, options.query);

    for (let attempt = 0; ; attempt++) {
      try {
        return await this.#attempt<T>(method, url, options, attempt);
      } catch (error) {
        if (!this.#shouldRetry(error, attempt)) {
          throw error;
        }
        await sleep(this.#backoffDelayMs(attempt, error));
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
        signal,
      });
    } catch (cause) {
      throw new ShippoNetworkError(networkErrorMessage(cause, url, attempt), { cause });
    }

    if (!response.ok) {
      throw await toApiError(response, url);
    }

    return parseSuccessBody<T>(response);
  }

  #buildUrl(path: string, query: RequestOptions["query"]): string {
    const url = new URL(path.startsWith("http") ? path : `${this.baseUrl}${path}`);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  #shouldRetry(error: unknown, attempt: number): boolean {
    if (attempt >= this.#maxRetries) {
      return false;
    }
    if (error instanceof ShippoNetworkError) {
      return true;
    }
    if (error instanceof ShippoApiError) {
      return RETRYABLE_STATUS_CODES.has(error.status);
    }
    return false;
  }

  #backoffDelayMs(attempt: number, error: unknown): number {
    if (error instanceof ShippoApiError && error.retryAfterMs !== undefined) {
      return error.retryAfterMs;
    }
    const exponential = this.#retryDelayMs * 2 ** attempt;
    const jitter = Math.random() * this.#retryDelayMs;
    return exponential + jitter;
  }
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
  return `Shippo API request to ${url} failed on attempt ${attempt + 1}: ${reason}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
