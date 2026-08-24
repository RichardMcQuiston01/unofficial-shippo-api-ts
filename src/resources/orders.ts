import type { ShippoClient } from "../client";
import type { ListQuery, UnconfirmedPaginatedList } from "../pagination";
import type { Address, AddressCreateRequest } from "./addresses";

/**
 * No OpenAPI spec was reachable for Orders while building this package
 * (ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`, `get`)
 * are confirmed by cross-referencing Shippo's official Python/JS/C# SDKs.
 * This is the least-confirmed resource in the package -- an Order
 * represents an e-commerce order to be fulfilled (distinct from a
 * `Shipment`, the actual shipping transaction), and Shippo's real schema
 * almost certainly has more fields than are captured here (e.g. shop_app
 * source metadata, taxes, discounts). Deliberately kept to a conservative
 * core rather than fabricating a larger shape. Treat every field as
 * advisory, not verified.
 */
export type OrderStatus =
  "PAID" | "SHIPPED" | "CANCELLED" | "AWAITPAY" | "UNKNOWN" | "REFUNDED" | "PARTIALLY_REFUNDED";

/**
 * One line item on an order. Field names are a guess at shape based on
 * common e-commerce line-item conventions -- not confirmed by any
 * reachable source.
 */
export interface OrderLineItem {
  title?: string;
  quantity?: number;
  total_price?: string;
  currency?: string;
  sku?: string;
  weight?: string;
  weight_unit?: string;
}

export interface Order {
  object_id: string;
  /** The merchant's own order identifier (not Shippo's `object_id`). */
  order_number: string;
  order_status: OrderStatus;
  placed_at: string;
  to_address: Address;
  from_address?: Address;
  line_items?: OrderLineItem[];
  shipping_cost?: string;
  shipping_cost_currency?: string;
  subtotal_price?: string;
  total_price?: string;
  total_tax?: string;
  currency?: string;
  weight?: string;
  weight_unit?: string;
  object_created: string;
  object_updated: string;
}

export interface OrderCreateRequest {
  order_number: string;
  order_status: OrderStatus;
  placed_at: string;
  /** An existing address object ID, or inline data to create one. */
  to_address: string | AddressCreateRequest;
  /** An existing address object ID, or inline data to create one. */
  from_address?: string | AddressCreateRequest;
  line_items?: OrderLineItem[];
  shipping_cost?: string;
  shipping_cost_currency?: string;
  subtotal_price?: string;
  total_price?: string;
  total_tax?: string;
  currency?: string;
  weight?: string;
  weight_unit?: string;
}

export class OrdersResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new order representing an e-commerce order to be fulfilled. */
  async create(request: OrderCreateRequest): Promise<Order> {
    return this.client.request<Order>("POST", "/orders", { body: request });
  }

  /**
   * Retrieves a single page of previously created orders.
   *
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
   * envelope omits `count`, unlike the confirmed-spec resources' pagination.
   */
  async list(query?: ListQuery): Promise<UnconfirmedPaginatedList<Order>> {
    return this.client.request<UnconfirmedPaginatedList<Order>>("GET", "/orders", { query });
  }

  /** Retrieves a single order by its object ID. */
  async get(orderId: string): Promise<Order> {
    return this.client.request<Order>("GET", `/orders/${orderId}`);
  }
}
