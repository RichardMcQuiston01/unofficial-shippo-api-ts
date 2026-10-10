import type { RequestOptions, ShippoClient } from "./client";
import { ShippoError } from "./errors";

/**
 * The list-endpoint response shape confirmed against Shippo's OpenAPI
 * mirror (ROADMAP.md §2 "Pagination") — Django REST Framework's standard
 * `page`/`results` pagination.
 */
export interface PaginatedList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * The list-endpoint response shape for resources with no reachable OpenAPI
 * spec (ROADMAP.md §2 "Coverage gap"). Live-contract testing against a real
 * Shippo test-mode account (ROADMAP.md Stage 5) found these endpoints don't
 * reliably include `count`/`next`/`previous`, and `results` can be `null`
 * instead of `[]` when empty — unlike `PaginatedList`, nothing here beyond
 * the field's presence is guaranteed.
 */
export interface UnconfirmedPaginatedList<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[] | null;
}

/**
 * Standard query params accepted by every `list()` method. The index
 * signature (rather than just `page`/`results`) is what lets this satisfy
 * `RequestOptions["query"]` directly, structurally.
 */
export interface ListQuery {
  page?: number;
  results?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Iterates every item across every page of a list endpoint, following
 * `next` until it is `null`, `undefined`, or empty. One HTTP request per
 * page, made lazily as the generator is consumed — safe to `for await` over
 * an unbounded resource without fetching pages you never read.
 *
 * Tolerates the `UnconfirmedPaginatedList` shape: a missing or `null`
 * `results` is an empty page, and a missing `next` ends iteration. A `next`
 * URL that was already requested throws a `ShippoError` rather than looping
 * forever, and `next` is subject to the client's same-origin check.
 *
 * `list()` methods on resource modules return a single `PaginatedList<T>`
 * page (matching the raw API shape); reach for this helper when you want
 * every result instead of one page at a time.
 */
export async function* paginate<T>(
  client: ShippoClient,
  path: string,
  query?: RequestOptions["query"],
): AsyncGenerator<T, void, void> {
  let nextUrl: string | null | undefined = path;
  let nextQuery: RequestOptions["query"] | undefined = query;
  const requested = new Set<string>();

  while (nextUrl) {
    const requestKey = pageKey(nextUrl, nextQuery);
    if (requested.has(requestKey)) {
      throw new ShippoError(
        `Pagination loop detected: "${nextUrl}" was already requested. Stopping instead of ` +
          `fetching it again.`,
      );
    }
    requested.add(requestKey);

    const page: PaginatedList<T> | UnconfirmedPaginatedList<T> = await client.request<
      PaginatedList<T> | UnconfirmedPaginatedList<T>
    >("GET", nextUrl, { query: nextQuery });
    for (const item of page.results ?? []) {
      yield item;
    }
    nextUrl = page.next;
    // `next` is already a fully-qualified URL with its own query string.
    nextQuery = undefined;
  }
}

function pageKey(url: string, query: RequestOptions["query"]): string {
  const params = Object.entries(query ?? {})
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${String(value)}`)
    .sort();
  return params.length > 0 ? `${url}?${params.join("&")}` : url;
}
