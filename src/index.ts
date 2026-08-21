/**
 * Entry point. Stages 0-3 of ROADMAP.md are built: core HTTP transport,
 * core resources, and extended resources. See ROADMAP.md and
 * docs/CONVENTIONS.md for what's here and what's still out of scope
 * (Platform API, Shippo Accounts).
 */

import { version as packageVersion } from "../package.json";

import { ShippoClient, type ShippoClientOptions } from "./client";
import { AddressesResource } from "./resources/addresses";
import { BatchesResource } from "./resources/batches";
import { CarrierAccountsResource } from "./resources/carrier-accounts";
import { CarrierParcelTemplatesResource } from "./resources/carrier-parcel-templates";
import { CustomsDeclarationsResource } from "./resources/customs-declarations";
import { CustomsItemsResource } from "./resources/customs-items";
import { ManifestsResource } from "./resources/manifests";
import { OrdersResource } from "./resources/orders";
import { ParcelsResource } from "./resources/parcels";
import { PickupsResource } from "./resources/pickups";
import { RatesResource } from "./resources/rates";
import { RatesAtCheckoutResource } from "./resources/rates-at-checkout";
import { RefundsResource } from "./resources/refunds";
import { ServiceGroupsResource } from "./resources/service-groups";
import { ShipmentsResource } from "./resources/shipments";
import { TrackingResource } from "./resources/tracking";
import { TransactionsResource } from "./resources/transactions";
import { UserParcelTemplatesResource } from "./resources/user-parcel-templates";
import { WebhooksResource } from "./resources/webhooks";

/** This package's own version, read from `package.json` so it can't drift out of sync. */
export const SDK_VERSION: string = packageVersion;

export type { HttpMethod, RequestOptions, ShippoClientOptions } from "./client";
export { ShippoClient } from "./client";
export { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";
export type { ListQuery, PaginatedList, UnconfirmedPaginatedList } from "./pagination";
export { paginate } from "./pagination";

export type {
  Address,
  AddressCreateRequest,
  AddressValidationResults,
} from "./resources/addresses";
export { AddressesResource } from "./resources/addresses";
export type {
  Batch,
  BatchCreateRequest,
  BatchObjectResult,
  BatchShipment,
  BatchShipmentIds,
  BatchStatus,
} from "./resources/batches";
export { BatchesResource } from "./resources/batches";
export type {
  CarrierAccount,
  CarrierAccountCreateRequest,
  CarrierAccountOauth2SigninResult,
  CarrierAccountParameters,
  CarrierAccountRegistrationStatus,
  CarrierAccountUpdateRequest,
} from "./resources/carrier-accounts";
export { CarrierAccountsResource } from "./resources/carrier-accounts";
export type { CarrierParcelTemplate } from "./resources/carrier-parcel-templates";
export { CarrierParcelTemplatesResource } from "./resources/carrier-parcel-templates";
export type {
  CustomsDeclaration,
  CustomsDeclarationContentsType,
  CustomsDeclarationCreateRequest,
  CustomsDeclarationNonDeliveryOption,
} from "./resources/customs-declarations";
export { CustomsDeclarationsResource } from "./resources/customs-declarations";
export type { CustomsItem, CustomsItemCreateRequest } from "./resources/customs-items";
export { CustomsItemsResource } from "./resources/customs-items";
export type { Manifest, ManifestCreateRequest, ManifestStatus } from "./resources/manifests";
export { ManifestsResource } from "./resources/manifests";
export type { Order, OrderCreateRequest, OrderLineItem, OrderStatus } from "./resources/orders";
export { OrdersResource } from "./resources/orders";
export type { DistanceUnit, MassUnit, Parcel, ParcelCreateRequest } from "./resources/parcels";
export { ParcelsResource } from "./resources/parcels";
export type { Pickup, PickupCreateRequest, PickupLocation } from "./resources/pickups";
export { PickupsResource } from "./resources/pickups";
export type { Rate, RateList, ServiceLevel } from "./resources/rates";
export { RatesResource } from "./resources/rates";
export type { RatesAtCheckoutCreateRequest } from "./resources/rates-at-checkout";
export { RatesAtCheckoutResource } from "./resources/rates-at-checkout";
export type { Refund, RefundCreateRequest, RefundStatus } from "./resources/refunds";
export { RefundsResource } from "./resources/refunds";
export type {
  ServiceGroup,
  ServiceGroupCreateRequest,
  ServiceGroupRateService,
  ServiceGroupUpdateRequest,
} from "./resources/service-groups";
export { ServiceGroupsResource } from "./resources/service-groups";
export type {
  Shipment,
  ShipmentCreateRequest,
  ShipmentExtra,
  ShipmentStatus,
} from "./resources/shipments";
export { ShipmentsResource } from "./resources/shipments";
export type {
  TrackingCreateRequest,
  TrackingLocation,
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
export type {
  UserParcelTemplate,
  UserParcelTemplateCreateRequest,
  UserParcelTemplateUpdateRequest,
} from "./resources/user-parcel-templates";
export { UserParcelTemplatesResource } from "./resources/user-parcel-templates";
export type {
  BatchWebhookEvent,
  ShippoWebhookEvent,
  TrackUpdatedWebhookEvent,
  TransactionWebhookEvent,
  Webhook,
  WebhookCreateRequest,
  WebhookEventType,
  WebhookUpdateRequest,
} from "./resources/webhooks";
export { parseEvent, WebhooksResource } from "./resources/webhooks";

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

  readonly webhooks: WebhooksResource;
  readonly batches: BatchesResource;
  readonly refunds: RefundsResource;
  readonly customsDeclarations: CustomsDeclarationsResource;
  readonly customsItems: CustomsItemsResource;
  readonly manifests: ManifestsResource;
  readonly orders: OrdersResource;
  readonly carrierAccounts: CarrierAccountsResource;
  readonly carrierParcelTemplates: CarrierParcelTemplatesResource;
  readonly userParcelTemplates: UserParcelTemplatesResource;
  readonly serviceGroups: ServiceGroupsResource;
  readonly pickups: PickupsResource;
  readonly ratesAtCheckout: RatesAtCheckoutResource;

  constructor(options: ShippoClientOptions) {
    this.client = new ShippoClient(options);
    this.addresses = new AddressesResource(this.client);
    this.parcels = new ParcelsResource(this.client);
    this.shipments = new ShipmentsResource(this.client);
    this.rates = new RatesResource(this.client);
    this.transactions = new TransactionsResource(this.client);
    this.tracking = new TrackingResource(this.client);

    this.webhooks = new WebhooksResource(this.client);
    this.batches = new BatchesResource(this.client);
    this.refunds = new RefundsResource(this.client);
    this.customsDeclarations = new CustomsDeclarationsResource(this.client);
    this.customsItems = new CustomsItemsResource(this.client);
    this.manifests = new ManifestsResource(this.client);
    this.orders = new OrdersResource(this.client);
    this.carrierAccounts = new CarrierAccountsResource(this.client);
    this.carrierParcelTemplates = new CarrierParcelTemplatesResource(this.client);
    this.userParcelTemplates = new UserParcelTemplatesResource(this.client);
    this.serviceGroups = new ServiceGroupsResource(this.client);
    this.pickups = new PickupsResource(this.client);
    this.ratesAtCheckout = new RatesAtCheckoutResource(this.client);
  }
}
