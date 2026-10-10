/**
 * Base class for every error this package throws. Lets consumers write a
 * single `catch (err) { if (err instanceof ShippoError) ... }` guard rather
 * than checking multiple unrelated error types.
 */
export class ShippoError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ShippoError";
  }
}

/**
 * Thrown when the Shippo API responds with a non-2xx status.
 *
 * Shippo's error response body shape is not documented anywhere we could
 * reach while building this client (see ROADMAP.md §2 "Error response
 * schema" and the Stage 1 spike note) — `body` is intentionally `unknown`
 * rather than a typed shape. `message` is a best-effort extraction that
 * falls back gracefully if the body doesn't look like what we expect.
 */
export class ShippoApiError extends ShippoError {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;
  readonly requestId: string | undefined;
  /**
   * Parsed from a `Retry-After` response header (seconds or HTTP-date form),
   * in milliseconds. `undefined` if the header was absent — Shippo isn't
   * confirmed to send it, so callers must not assume it's always present.
   */
  readonly retryAfterMs: number | undefined;

  constructor(options: {
    status: number;
    statusText: string;
    body: unknown;
    requestId: string | undefined;
    retryAfterMs: number | undefined;
    url: string;
  }) {
    super(formatMessage(options));
    this.name = "ShippoApiError";
    this.status = options.status;
    this.statusText = options.statusText;
    this.body = options.body;
    this.requestId = options.requestId;
    this.retryAfterMs = options.retryAfterMs;
  }
}

/**
 * Thrown for failures that never got an HTTP response at all — the
 * request timed out, the network dropped, DNS failed, etc. Distinct from
 * `ShippoApiError` so consumers can tell "Shippo said no" apart from
 * "we couldn't reach Shippo."
 */
export class ShippoNetworkError extends ShippoError {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ShippoNetworkError";
  }
}

/** Longest `detail`/field summary placed in `message`. The full body stays on `.body`. */
const MAX_DETAIL_LENGTH = 500;

/**
 * Keys whose values commonly hold credentials or account data. Their values
 * never appear in `message`, even as part of a field-error summary.
 */
const SENSITIVE_KEY_PATTERN =
  /password|passwd|secret|token|api[_-]?key|authorization|credential|parameters|account[_-]?(id|number)/i;

function formatMessage(options: {
  status: number;
  statusText: string;
  body: unknown;
  url: string;
}): string {
  const detail = extractDetail(options.body);
  const base = `Shippo API request failed with ${options.status} ${options.statusText} (${redactUrl(options.url)})`;
  return detail ? `${base}: ${detail}` : base;
}

/**
 * Drops the query string, fragment, and any userinfo from a URL before it is
 * placed in an error message. List calls can carry names or emails in the
 * query, and error messages end up in logs and error reporters.
 */
export function redactUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split(/[?#]/, 1)[0] ?? "";
  }
}

/**
 * Short, best-effort human-readable detail from an unknown error body.
 * Handles the shapes Django REST Framework (which Shippo's pagination
 * matches) commonly produces: `{ detail: string }` for auth/permission/
 * not-found errors, and `{ field: string[] }` for validation errors.
 *
 * Deliberately never serializes an unrecognized body: Shippo error bodies
 * can echo the request (addresses, customs data, carrier `parameters`), and
 * `message` is what loggers and APM tools capture by default. Callers who
 * need the raw response read `error.body`. Output is capped at
 * `MAX_DETAIL_LENGTH` characters.
 */
function extractDetail(body: unknown): string | undefined {
  if (typeof body === "string") {
    return body.length > 0 ? truncate(body) : undefined;
  }

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return undefined;
  }

  const record = body as Record<string, unknown>;

  if (typeof record["detail"] === "string") {
    return truncate(record["detail"]);
  }

  const fieldErrors = Object.entries(record)
    .filter(([field]) => !SENSITIVE_KEY_PATTERN.test(field))
    .filter(
      (entry): entry is [string, string[]] =>
        Array.isArray(entry[1]) &&
        entry[1].length > 0 &&
        entry[1].every((message) => typeof message === "string"),
    )
    .map(([field, messages]) => `${field}: ${messages.join(", ")}`);
  if (fieldErrors.length > 0) {
    return truncate(fieldErrors.join("; "));
  }

  return undefined;
}

function truncate(text: string): string {
  return text.length > MAX_DETAIL_LENGTH ? `${text.slice(0, MAX_DETAIL_LENGTH)}...` : text;
}
