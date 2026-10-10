import { ShippoError } from "./errors";

/**
 * Builds a request path from a literal collection prefix plus dynamic
 * segments (object IDs, carrier codes, tracking numbers). Every dynamic
 * segment is percent-encoded, so `/`, `?`, and `#` in a caller-supplied
 * value cannot change which endpoint is called or start a query string.
 *
 * `.` and `..` are rejected outright: they survive percent-encoding and
 * the URL parser still treats them (and `%2e`) as dot segments, which
 * would climb out of the intended collection.
 */
export function apiPath(prefix: string, ...segments: string[]): string {
  const encoded: string[] = segments.map((segment) => {
    if (typeof segment !== "string" || segment.length === 0) {
      throw new ShippoError(
        `Invalid path segment for "${prefix}": expected a non-empty string, received ${JSON.stringify(segment)}.`,
      );
    }
    if (segment === "." || segment === "..") {
      throw new ShippoError(
        `Invalid path segment for "${prefix}": "${segment}" is not allowed because it would change the request path.`,
      );
    }
    return encodeURIComponent(segment);
  });
  return [prefix, ...encoded].join("/");
}
