import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { AddressesResource } from "./addresses";

const SAMPLE_ADDRESS = {
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

describe("AddressesResource", () => {
  test("create() posts to /addresses and returns the created address", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_ADDRESS }));
    const addresses = new AddressesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await addresses.create({
      name: "Ada Lovelace",
      street1: "123 Main St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "US",
    });

    expect(result).toEqual(SAMPLE_ADDRESS);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/addresses");
    expect(calls[0]?.method).toBe("POST");
  });

  test("list() gets /addresses with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_ADDRESS] },
    }));
    const addresses = new AddressesResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await addresses.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_ADDRESS]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/addresses");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single address by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_ADDRESS }));
    const addresses = new AddressesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await addresses.get("addr_123");

    expect(result).toEqual(SAMPLE_ADDRESS);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/addresses/addr_123");
  });

  test("validate() hits the /validate endpoint", async () => {
    const validated = { ...SAMPLE_ADDRESS, validation_results: { is_valid: true, messages: [] } };
    const { fetch, calls } = createMockFetch(() => ({ body: validated }));
    const addresses = new AddressesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await addresses.validate("addr_123");

    expect(result.validation_results?.is_valid).toBe(true);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/addresses/addr_123/validate");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const addresses = new AddressesResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await addresses.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
