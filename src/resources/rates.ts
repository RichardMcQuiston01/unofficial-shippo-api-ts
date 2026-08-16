import type { ShippoClient } from "../client";

export interface ServiceLevel {
  name?: string;
  token?: string;
  terms?: string;
}

export interface Rate {
  object_id: string;
  object_created: string;
  amount: string;
  currency: string;
  amount_local?: string;
  currency_local?: string;
  provider: string;
  provider_image_75?: string;
  servicelevel?: ServiceLevel;
  days?: number;
  arrives_by?: string;
  duration_terms?: string;
  trackable?: boolean;
  attributes?: string[];
}

/**
 * Shape of `GET /shipments/{id}/rates` and its per-currency variant. Unlike
 * other list endpoints, the reachable OpenAPI mirror doesn't document this
 * as the standard `{count, next, previous, results}` envelope (and the
 * roadmap's method names — `listForShipment`, not `list` — reflect that);
 * a rate list is bounded to one shipment, so it's a plain results array.
 */
export interface RateList {
  results: Rate[];
}

export class RatesResource {
  constructor(private readonly client: ShippoClient) {}

  /** Retrieves a single previously-computed rate by its object ID. */
  async get(rateId: string): Promise<Rate> {
    return this.client.request<Rate>("GET", `/rates/${rateId}`);
  }

  /** Retrieves all rates computed for a shipment. */
  async listForShipment(shipmentId: string): Promise<RateList> {
    return this.client.request<RateList>("GET", `/shipments/${shipmentId}/rates`);
  }

  /** Retrieves a shipment's rates converted to the given ISO 4217 currency code. */
  async listForShipmentByCurrency(shipmentId: string, currencyCode: string): Promise<RateList> {
    return this.client.request<RateList>("GET", `/shipments/${shipmentId}/rates/${currencyCode}`);
  }
}
