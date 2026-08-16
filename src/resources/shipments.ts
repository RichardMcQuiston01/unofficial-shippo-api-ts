import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { Address, AddressCreateRequest } from "./addresses";
import type { Parcel, ParcelCreateRequest } from "./parcels";
import type { Rate } from "./rates";

export type ShipmentStatus = "WAITING" | "QUEUED" | "SUCCESS" | "ERROR";

/**
 * Carrier-specific shipment options (signature required, insurance,
 * Saturday delivery, etc.). Genuinely carrier-dependent — Shippo's own
 * `shipment-extras` tooling exists specifically because supported options
 * vary per carrier — so this is intentionally left loosely typed rather
 * than guessing a fixed shape.
 */
export type ShipmentExtra = Record<string, unknown>;

export interface Shipment {
  object_id: string;
  status: ShipmentStatus;
  address_from: Address;
  address_to: Address;
  address_return?: Address;
  parcels: Parcel[];
  /** Populated once rates have been computed (synchronously, unless `async` was set). */
  rates?: Rate[];
  extra?: ShipmentExtra;
  metadata?: string;
  object_created: string;
  object_updated: string;
}

export interface ShipmentCreateRequest {
  /** An existing address object ID, or inline data to create one. */
  address_from: string | AddressCreateRequest;
  /** An existing address object ID, or inline data to create one. */
  address_to: string | AddressCreateRequest;
  /** An existing address object ID, or inline data to create one. */
  address_return?: string | AddressCreateRequest;
  /** Existing parcel object IDs, or inline data to create them. */
  parcels: Array<string | ParcelCreateRequest>;
  extra?: ShipmentExtra;
  metadata?: string;
  /** If true, rates are computed asynchronously rather than in the response. */
  async?: boolean;
}

export class ShipmentsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a shipment from a from/to address and one or more parcels, computing rates. */
  async create(request: ShipmentCreateRequest): Promise<Shipment> {
    return this.client.request<Shipment>("POST", "/shipments", { body: request });
  }

  /** Retrieves a single page of previously created shipments. */
  async list(query?: ListQuery): Promise<PaginatedList<Shipment>> {
    return this.client.request<PaginatedList<Shipment>>("GET", "/shipments", { query });
  }

  /** Retrieves a single shipment by its object ID. */
  async get(shipmentId: string): Promise<Shipment> {
    return this.client.request<Shipment>("GET", `/shipments/${shipmentId}`);
  }
}
