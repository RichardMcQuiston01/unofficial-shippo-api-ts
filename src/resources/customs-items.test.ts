import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { CustomsItemsResource, type CustomsItem } from "./customs-items";

const SAMPLE_CUSTOMS_ITEM: CustomsItem = {
  object_id: "ci_123",
  description: "T-shirt",
  quantity: 2,
  net_weight: "0.5",
  mass_unit: "lb",
  value_amount: "20.00",
  value_currency: "USD",
  origin_country: "US",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("CustomsItemsResource", () => {
  test("create() posts to /customs/items and returns the created customs item", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_CUSTOMS_ITEM }));
    const customsItems = new CustomsItemsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await customsItems.create({
      description: "T-shirt",
      quantity: 2,
      net_weight: "0.5",
      mass_unit: "lb",
      value_amount: "20.00",
      value_currency: "USD",
      origin_country: "US",
    });

    expect(result).toEqual(SAMPLE_CUSTOMS_ITEM);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/customs/items");
    expect(calls[0]?.method).toBe("POST");
  });

  test("list() gets /customs/items with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_CUSTOMS_ITEM] },
    }));
    const customsItems = new CustomsItemsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await customsItems.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_CUSTOMS_ITEM]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/customs/items");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single customs item by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_CUSTOMS_ITEM }));
    const customsItems = new CustomsItemsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await customsItems.get("ci_123");

    expect(result).toEqual(SAMPLE_CUSTOMS_ITEM);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/customs/items/ci_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const customsItems = new CustomsItemsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await customsItems.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
