import type { ShippoClient } from "../client";
import type { AddressCreateRequest } from "./addresses";

/**
 * Pickups have no reachable OpenAPI coverage (ROADMAP.md §2 "Coverage
 * gap" — not one of the 9 resources with a mirrored spec). Everything in
 * this file is a best-effort typing derived from cross-referencing the
 * `create` method across Shippo's official Python, JS, and C# SDKs (method
 * names only — field shapes are not confirmed by any of the three) plus
 * general REST/domain conventions for a "schedule a carrier pickup"
 * operation. Treat every field below as advisory, not verified.
 *
 * Only `create` is confirmed to exist: none of the three reference SDKs
 * expose list/get/update/delete for pickups, so this module doesn't invent
 * them.
 */

/**
 * Where and how the carrier should collect the shipment(s). Best-effort
 * guess at the nested shape Shippo's API expects — `address` may accept
 * either an existing address object ID or an inline address to create,
 * mirroring the `address_from`/`address_to` pattern used elsewhere in the
 * API (e.g. Shipments), but this nesting itself is unconfirmed.
 */
export interface PickupLocation {
  address: string | AddressCreateRequest;
  /** e.g. "Front Door", "Reception" — carrier-specific free text, unconfirmed enum. */
  building_location_type?: string;
  /** Free-text instructions for the driver, e.g. gate code or building access notes. */
  instructions?: string;
}

export interface PickupCreateRequest {
  /** Object ID of the Carrier Account the pickup is requested with. */
  carrier_account: string;
  location: PickupLocation;
  /** Object IDs of the purchased transactions (labels) to be picked up. */
  transactions: string[];
  requested_start_time: string;
  requested_end_time: string;
  metadata?: string;
}

/**
 * Response shape for a scheduled pickup. Kept intentionally smaller and
 * more conservative than the request type — fields like `confirmation_code`
 * are a reasonable guess for this domain (a carrier-assigned confirmation
 * number) but are not confirmed against any primary source, so every field
 * here is optional rather than asserted as guaranteed-present.
 */
export interface Pickup {
  object_id?: string;
  carrier_account?: string;
  location?: PickupLocation;
  transactions?: string[];
  /** Carrier's confirmation number for the scheduled pickup, if provided. Unconfirmed field. */
  confirmation_code?: string;
  requested_start_time?: string;
  requested_end_time?: string;
  /** Carrier-confirmed pickup window, which may differ from the requested one. Unconfirmed field. */
  confirmed_start_time?: string;
  confirmed_end_time?: string;
  object_created?: string;
  object_updated?: string;
}

export class PickupsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Requests a carrier pickup for one or more previously purchased transactions. */
  async create(request: PickupCreateRequest): Promise<Pickup> {
    return this.client.request<Pickup>("POST", "/pickups", { body: request });
  }
}
