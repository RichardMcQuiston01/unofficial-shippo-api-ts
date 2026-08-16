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

function formatMessage(options: {
  status: number;
  statusText: string;
  body: unknown;
  url: string;
}): string {
  const detail = extractDetail(options.body);
  const base = `Shippo API request failed with ${options.status} ${options.statusText} (${options.url})`;
  return detail ? `${base}: ${detail}` : base;
}

/**
 * Best-effort human-readable detail from an unknown error body. Handles the
 * shapes Django REST Framework (which Shippo's pagination matches) commonly
 * produces: `{ detail: string }` for auth/permission/not-found errors, and
 * `{ field: string[] }` for validation errors. Falls back to a compact JSON
 * dump, then nothing, rather than throwing while formatting an error.
 */
function extractDetail(body: unknown): string | undefined {
  if (typeof body === "string") {
    return body.length > 0 ? body : undefined;
  }

  if (body === null || typeof body !== "object") {
    return undefined;
  }

  const record = body as Record<string, unknown>;

  if (typeof record["detail"] === "string") {
    return record["detail"];
  }

  const fieldErrors = Object.entries(record)
    .filter(([, value]) => Array.isArray(value))
    .map(([field, value]) => `${field}: ${(value as unknown[]).join(", ")}`);
  if (fieldErrors.length > 0) {
    return fieldErrors.join("; ");
  }

  try {
    return JSON.stringify(body);
  } catch {
    return undefined;
  }
}
