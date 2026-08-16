/**
 * Entry point. Extended resource modules (webhooks, batches, customs, ...)
 * land in Stage 3 — see ROADMAP.md and docs/CONVENTIONS.md.
 */

import { ShippoClient, type ShippoClientOptions } from "./client";
import { AddressesResource } from "./resources/addresses";
import { ParcelsResource } from "./resources/parcels";
import { RatesResource } from "./resources/rates";
import { ShipmentsResource } from "./resources/shipments";
import { TrackingResource } from "./resources/tracking";
import { TransactionsResource } from "./resources/transactions";

export const SDK_VERSION = "0.0.0";

export type { HttpMethod, RequestOptions, ShippoClientOptions } from "./client";
export { ShippoClient } from "./client";
export { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";
export type { ListQuery, PaginatedList } from "./pagination";
export { paginate } from "./pagination";

export type {
  Address,
  AddressCreateRequest,
  AddressValidationResults,
} from "./resources/addresses";
export { AddressesResource } from "./resources/addresses";
export type { DistanceUnit, MassUnit, Parcel, ParcelCreateRequest } from "./resources/parcels";
export { ParcelsResource } from "./resources/parcels";
export type { Rate, RateList, ServiceLevel } from "./resources/rates";
export { RatesResource } from "./resources/rates";
export type {
  Shipment,
  ShipmentCreateRequest,
  ShipmentExtra,
  ShipmentStatus,
} from "./resources/shipments";
export { ShipmentsResource } from "./resources/shipments";
export type {
  TrackingLocation,
  TrackingRegisterRequest,
  TrackingStatus,
  TrackingStatusDetail,
  TrackingStatusValue,
} from "./resources/tracking";
export { TrackingResource } from "./resources/tracking";
export type {
  LabelFileType,
  Transaction,
  TransactionCreateRequest,
  TransactionStatus,
} from "./resources/transactions";
export { TransactionsResource } from "./resources/transactions";

export class Shippo {
  /**
   * The underlying HTTP transport. Escape hatch for any endpoint not yet
   * wrapped in a typed resource method below — call
   * `shippo.client.request(...)` directly. The API token itself stays out
   * of reach: it's a true private field inside `ShippoClient`, so it never
   * shows up via `JSON.stringify` or `console.log` on either object.
   */
  readonly client: ShippoClient;

  readonly addresses: AddressesResource;
  readonly parcels: ParcelsResource;
  readonly shipments: ShipmentsResource;
  readonly rates: RatesResource;
  readonly transactions: TransactionsResource;
  readonly tracking: TrackingResource;

  constructor(options: ShippoClientOptions) {
    this.client = new ShippoClient(options);
    this.addresses = new AddressesResource(this.client);
    this.parcels = new ParcelsResource(this.client);
    this.shipments = new ShipmentsResource(this.client);
    this.rates = new RatesResource(this.client);
    this.transactions = new TransactionsResource(this.client);
    this.tracking = new TrackingResource(this.client);
  }
}
