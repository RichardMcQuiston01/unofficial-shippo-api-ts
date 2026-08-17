import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import type { Address } from "./addresses";
import type { Parcel } from "./parcels";
import { ShipmentsResource, type Shipment } from "./shipments";

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

const SAMPLE_PARCEL: Parcel = {
  object_id: "parcel_123",
  length: "10",
  width: "8",
  height: "4",
  distance_unit: "in",
  weight: "2",
  mass_unit: "lb",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

const SAMPLE_SHIPMENT: Shipment = {
  object_id: "ship_123",
  status: "SUCCESS",
  address_from: SAMPLE_ADDRESS,
  address_to: SAMPLE_ADDRESS,
  parcels: [SAMPLE_PARCEL],
  rates: [],
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("ShipmentsResource", () => {
  test("create() posts to /shipments and returns the created shipment", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_SHIPMENT }));
    const shipments = new ShipmentsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await shipments.create({
      address_from: "addr_123",
      address_to: "addr_123",
      parcels: ["parcel_123"],
    });

    expect(result).toEqual(SAMPLE_SHIPMENT);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/shipments");
  });

  test("create() accepts inline address/parcel creation payloads", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_SHIPMENT }));
    const shipments = new ShipmentsResource(new ShippoClient({ apiKey: "key", fetch }));

    await shipments.create({
      address_from: {
        name: "Ada Lovelace",
        street1: "123 Main St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "US",
      },
      address_to: "addr_456",
      parcels: [
        {
          length: "10",
          width: "8",
          height: "4",
          distance_unit: "in",
          weight: "2",
          mass_unit: "lb",
        },
      ],
    });

    const body = JSON.parse(calls[0]?.body ?? "{}");
    expect(body.address_from.name).toBe("Ada Lovelace");
    expect(body.address_to).toBe("addr_456");
  });

  test("list() gets /shipments and returns a page", async () => {
    const { fetch } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_SHIPMENT] },
    }));
    const shipments = new ShipmentsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await shipments.list();

    expect(page.results).toEqual([SAMPLE_SHIPMENT]);
  });

  test("get() fetches a single shipment by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_SHIPMENT }));
    const shipments = new ShipmentsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await shipments.get("ship_123");

    expect(result).toEqual(SAMPLE_SHIPMENT);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/shipments/ship_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 400, body: { parcels: ["Required."] } }));
    const shipments = new ShipmentsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await shipments
      .create({ address_from: "addr_123", address_to: "addr_456", parcels: [] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(400);
  });
});
