/**
 * Entry point. Resource modules (addresses, shipments, rates, ...) land in
 * Stage 2/3 — see ROADMAP.md and docs/CONVENTIONS.md. This is currently a
 * thin wrapper: constructing a `Shippo` client stands up the internal HTTP
 * transport but exposes no resource namespaces yet.
 */

import { ShippoClient, type ShippoClientOptions } from "./client";

export const SDK_VERSION = "0.0.0";

export type { HttpMethod, RequestOptions, ShippoClientOptions } from "./client";
export { ShippoClient } from "./client";
export { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";
export type { PaginatedList } from "./pagination";
export { paginate } from "./pagination";

export class Shippo {
  /**
   * The underlying HTTP transport. Resource namespaces (`shippo.addresses`,
   * etc.) land in Stage 2/3 and will use this internally — until a given
   * resource is wrapped, call `shippo.client.request(...)` directly. The
   * API token itself stays out of reach: it's a true private field inside
   * `ShippoClient`, so it never shows up via `JSON.stringify` or
   * `console.log` on either object.
   */
  readonly client: ShippoClient;

  constructor(options: ShippoClientOptions) {
    this.client = new ShippoClient(options);
  }
}
