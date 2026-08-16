import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import type { Address } from "./addresses";
import { OrdersResource, type Order } from "./orders";

const SAMPLE_ADDRESS: Address = {
  object_id: "addr_123",
  is_complete: true,
  name: "Ada Lovelace",
  street1: "123 Main St",
  city: "Seattle",
  state: "WA",
  zip: "98101",
  country: "US",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

const SAMPLE_ORDER: Order = {
  object_id: "order_123",
  order_number: "#1001",
  order_status: "PAID",
  placed_at: "2026-01-01T00:00:00Z",
  to_address: SAMPLE_ADDRESS,
  line_items: [{ title: "Widget", quantity: 1, total_price: "10.00", currency: "USD" }],
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("OrdersResource", () => {
  test("create() posts to /orders and returns the created order", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_ORDER }));
    const orders = new OrdersResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await orders.create({
      order_number: "#1001",
      order_status: "PAID",
      placed_at: "2026-01-01T00:00:00Z",
      to_address: "addr_123",
    });

    expect(result).toEqual(SAMPLE_ORDER);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/orders");
    expect(calls[0]?.method).toBe("POST");
  });

  test("list() gets /orders with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_ORDER] },
    }));
    const orders = new OrdersResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await orders.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_ORDER]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/orders");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single order by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_ORDER }));
    const orders = new OrdersResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await orders.get("order_123");

    expect(result).toEqual(SAMPLE_ORDER);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/orders/order_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const orders = new OrdersResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await orders.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
