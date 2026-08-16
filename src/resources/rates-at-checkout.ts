import type { ShippoClient } from "../client";
import type { AddressCreateRequest } from "./addresses";
import type { ParcelCreateRequest, Parcel } from "./parcels";
import type { RateList } from "./rates";

/**
 * Rates at Checkout has no reachable OpenAPI coverage (ROADMAP.md §2
 * "Coverage gap" — not one of the 9 resources with a mirrored spec).
 * Everything in this file is a best-effort typing derived from
 * cross-referencing method names across Shippo's official Python, JS, and
 * C# SDKs plus general REST/domain conventions. Treat every field below as
 * advisory, not verified.
 *
 * This resource's scope is two things, not one — same callout as Group A's
 * Webhooks (ROADMAP.md §Stage 3): (1) `create`, which computes live
 * shippable rates for a business's own checkout flow without requiring a
 * full `Shipment` object to be created first, and (2) default-parcel-
 * template management (`getDefaultParcelTemplate` /
 * `updateDefaultParcelTemplate` / `deleteDefaultParcelTemplate`), which
 * configures the parcel `create` falls back to when called without an
 * explicit `parcel`. They're grouped in one file because they share the
 * `/rates_at_checkout` endpoint family, not because they're one concern.
 */

export interface RatesAtCheckoutCreateRequest {
  /** Existing address object ID, or an inline address. Best-effort — may default to the account's default address when omitted. */
  address_from?: string | AddressCreateRequest;
  /** Existing address object ID, or an inline address. */
  address_to: string | AddressCreateRequest;
  /** Existing parcel object ID, or an inline parcel. Falls back to the default parcel template (see `getDefaultParcelTemplate`) when omitted — unconfirmed fallback behavior. */
  parcel?: string | ParcelCreateRequest;
  /** Restrict quoting to these Carrier Account object IDs. Omit to quote across all connected carriers. */
  carrier_accounts?: string[];
}

export class RatesAtCheckoutResource {
  constructor(private readonly client: ShippoClient) {}

  /**
   * Computes live shippable rates for a checkout flow without first
   * creating a Shipment. Reuses `RateList` from `./rates`
   * (`{ results: Rate[] }`) on the judgment call that a "give me
   * shippable options" endpoint likely returns the same bounded,
   * non-paginated array shape as `GET /shipments/{id}/rates` rather than
   * the standard `{count, next, previous, results}` list envelope — a
   * guess, not a confirmed shape, since no OpenAPI coverage exists for
   * this endpoint.
   */
  async create(request: RatesAtCheckoutCreateRequest): Promise<RateList> {
    return this.client.request<RateList>("POST", "/rates_at_checkout", {
      body: request,
    });
  }

  /**
   * Retrieves the account-level default parcel template used by `create()`
   * when called without an explicit `parcel`. Returns `undefined` if none
   * is configured — this null-handling is a guess, since no primary source
   * confirms whether the endpoint 404s instead when unset.
   */
  async getDefaultParcelTemplate(): Promise<Parcel | undefined> {
    return this.client.request<Parcel | undefined>(
      "GET",
      "/rates_at_checkout/default_parcel_template",
    );
  }

  /** Sets the account-level default parcel template used by `create()` when no `parcel` is given. */
  async updateDefaultParcelTemplate(request: ParcelCreateRequest): Promise<Parcel> {
    return this.client.request<Parcel>("PUT", "/rates_at_checkout/default_parcel_template", {
      body: request,
    });
  }

  /** Clears the account-level default parcel template. */
  async deleteDefaultParcelTemplate(): Promise<void> {
    return this.client.request<void>("DELETE", "/rates_at_checkout/default_parcel_template");
  }
}
