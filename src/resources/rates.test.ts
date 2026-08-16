import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { RatesResource } from "./rates";

const SAMPLE_RATE = {
  object_id: "rate_123",
  object_created: "2026-01-01T00:00:00Z",
  amount: "5.50",
  currency: "USD",
  provider: "USPS",
  servicelevel: { name: "Priority Mail", token: "usps_priority" },
};

describe("RatesResource", () => {
  test("get() fetches a single rate by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_RATE }));
    const rates = new RatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await rates.get("rate_123");

    expect(result).toEqual(SAMPLE_RATE);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/rates/rate_123");
  });

  test("listForShipment() fetches rates for a shipment", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: { results: [SAMPLE_RATE] } }));
    const rates = new RatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await rates.listForShipment("ship_123");

    expect(result.results).toEqual([SAMPLE_RATE]);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/shipments/ship_123/rates");
  });

  test("listForShipmentByCurrency() includes the currency code in the path", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: { results: [SAMPLE_RATE] } }));
    const rates = new RatesResource(new ShippoClient({ apiKey: "key", fetch }));

    await rates.listForShipmentByCurrency("ship_123", "EUR");

    expect(calls[0]?.url).toBe("https://api.goshippo.com/shipments/ship_123/rates/EUR");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 404, body: { detail: "Not found." } }));
    const rates = new RatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await rates.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
