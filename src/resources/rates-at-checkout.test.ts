import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import type { Parcel } from "./parcels";
import { RatesAtCheckoutResource } from "./rates-at-checkout";

const SAMPLE_RATE = {
  object_id: "rate_123",
  object_created: "2026-08-16T00:00:00Z",
  amount: "5.50",
  currency: "USD",
  provider: "USPS",
};

const SAMPLE_PARCEL_TEMPLATE: Parcel = {
  object_id: "parcel_123",
  length: "10",
  width: "8",
  height: "4",
  distance_unit: "in",
  weight: "2",
  mass_unit: "lb",
  object_created: "2026-08-16T00:00:00Z",
  object_updated: "2026-08-16T00:00:00Z",
};

describe("RatesAtCheckoutResource", () => {
  test("create() posts to /rates_at_checkout and returns shippable rates", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: { results: [SAMPLE_RATE] } }));
    const ratesAtCheckout = new RatesAtCheckoutResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await ratesAtCheckout.create({
      address_to: "addr_123",
      parcel: "parcel_123",
    });

    expect(result.results).toEqual([SAMPLE_RATE]);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/rates_at_checkout");
    expect(calls[0]?.method).toBe("POST");
  });

  test("getDefaultParcelTemplate() gets the singleton default parcel template", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_PARCEL_TEMPLATE }));
    const ratesAtCheckout = new RatesAtCheckoutResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await ratesAtCheckout.getDefaultParcelTemplate();

    expect(result).toEqual(SAMPLE_PARCEL_TEMPLATE);
    expect(calls[0]?.url).toBe(
      "https://api.goshippo.com/rates_at_checkout/default_parcel_template",
    );
    expect(calls[0]?.method).toBe("GET");
  });

  test("updateDefaultParcelTemplate() puts to the singleton default parcel template", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_PARCEL_TEMPLATE }));
    const ratesAtCheckout = new RatesAtCheckoutResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await ratesAtCheckout.updateDefaultParcelTemplate({
      length: "10",
      width: "8",
      height: "4",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    });

    expect(result).toEqual(SAMPLE_PARCEL_TEMPLATE);
    expect(calls[0]?.url).toBe(
      "https://api.goshippo.com/rates_at_checkout/default_parcel_template",
    );
    expect(calls[0]?.method).toBe("PUT");
  });

  test("deleteDefaultParcelTemplate() deletes the singleton default parcel template", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 204 }));
    const ratesAtCheckout = new RatesAtCheckoutResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await ratesAtCheckout.deleteDefaultParcelTemplate();

    expect(result).toBeUndefined();
    expect(calls[0]?.url).toBe(
      "https://api.goshippo.com/rates_at_checkout/default_parcel_template",
    );
    expect(calls[0]?.method).toBe("DELETE");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 422,
      body: { address_to: ["This field is required."] },
    }));
    const ratesAtCheckout = new RatesAtCheckoutResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await ratesAtCheckout
      .create({ address_to: "addr_missing" })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(422);
  });
});
