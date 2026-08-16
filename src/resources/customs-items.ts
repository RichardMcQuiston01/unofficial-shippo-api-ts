import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { MassUnit } from "./parcels";

/**
 * No OpenAPI spec was reachable for Customs Items while building this
 * package (ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`,
 * `get`) are confirmed by cross-referencing Shippo's official Python/JS/C#
 * SDKs, but every field below is a best-effort reconstruction from general
 * knowledge of customs-declaration data for international shipping, not
 * verified against a primary source. Treat the whole shape as advisory.
 */
export interface CustomsItem {
  object_id: string;
  /** What the item is, for customs purposes. */
  description: string;
  quantity: number;
  /** String-typed weight, matching the pattern already used on `Parcel`. */
  net_weight: string;
  mass_unit: MassUnit;
  /** Declared value of the item, as a decimal string. */
  value_amount: string;
  /** ISO 4217 currency code. */
  value_currency: string;
  /** ISO 3166-1 alpha-2 country code the item originates from. */
  origin_country: string;
  /** HS tariff code, if provided. */
  tariff_number?: string;
  sku_code?: string;
  object_created: string;
  object_updated: string;
}

export interface CustomsItemCreateRequest {
  description: string;
  quantity: number;
  net_weight: string;
  mass_unit: MassUnit;
  value_amount: string;
  value_currency: string;
  origin_country: string;
  tariff_number?: string;
  sku_code?: string;
}

export class CustomsItemsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new customs item describing one line item for customs declarations. */
  async create(request: CustomsItemCreateRequest): Promise<CustomsItem> {
    return this.client.request<CustomsItem>("POST", "/customs/items", { body: request });
  }

  /** Retrieves a single page of previously created customs items. */
  async list(query?: ListQuery): Promise<PaginatedList<CustomsItem>> {
    return this.client.request<PaginatedList<CustomsItem>>("GET", "/customs/items", { query });
  }

  /** Retrieves a single customs item by its object ID. */
  async get(customsItemId: string): Promise<CustomsItem> {
    return this.client.request<CustomsItem>("GET", `/customs/items/${customsItemId}`);
  }
}
