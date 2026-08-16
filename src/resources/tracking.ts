import type { ShippoClient } from "../client";
import type { Address } from "./addresses";
import type { ServiceLevel } from "./rates";

export type TrackingStatusValue =
  "UNKNOWN" | "PRE_TRANSIT" | "TRANSIT" | "DELIVERED" | "RETURNED" | "FAILURE";

/**
 * Location sub-object on a tracking status/history entry. Not detailed in
 * the reachable OpenAPI mirror this package was built against (ROADMAP.md
 * §2) — left as an open record rather than guessing field names.
 */
export type TrackingLocation = Record<string, unknown>;

export interface TrackingStatusDetail {
  status?: TrackingStatusValue;
  status_details?: string;
  status_date?: string;
  location?: TrackingLocation;
}

export interface TrackingStatus {
  carrier?: string;
  tracking_number?: string;
  address_from?: Address;
  address_to?: Address;
  /** Object ID of the transaction (label purchase) this tracking status is for, if any. */
  transaction?: string;
  original_eta?: string;
  eta?: string;
  servicelevel?: ServiceLevel;
  tracking_status?: TrackingStatusDetail;
  tracking_history?: TrackingStatusDetail[];
}

export interface TrackingRegisterRequest {
  carrier: string;
  tracking_number: string;
  metadata?: string;
}

export class TrackingResource {
  constructor(private readonly client: ShippoClient) {}

  /** Registers a shipment for tracking, so Shippo starts polling the carrier for updates. */
  async create(request: TrackingRegisterRequest): Promise<TrackingStatus> {
    return this.client.request<TrackingStatus>("POST", "/tracks", { body: request });
  }

  /** Retrieves the current tracking status for a carrier + tracking number pair. */
  async get(carrier: string, trackingNumber: string): Promise<TrackingStatus> {
    return this.client.request<TrackingStatus>("GET", `/tracks/${carrier}/${trackingNumber}`);
  }
}
