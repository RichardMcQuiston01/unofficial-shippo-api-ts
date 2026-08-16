import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { ParcelsResource, type Parcel } from "./parcels";

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

describe("ParcelsResource", () => {
  test("create() posts to /parcels and returns the created parcel", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_PARCEL }));
    const parcels = new ParcelsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await parcels.create({
      length: "10",
      width: "8",
      height: "4",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    });

    expect(result).toEqual(SAMPLE_PARCEL);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/parcels");
  });

  test("list() gets /parcels and returns a page", async () => {
    const { fetch } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_PARCEL] },
    }));
    const parcels = new ParcelsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await parcels.list();

    expect(page.results).toEqual([SAMPLE_PARCEL]);
  });

  test("get() fetches a single parcel by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_PARCEL }));
    const parcels = new ParcelsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await parcels.get("parcel_123");

    expect(result).toEqual(SAMPLE_PARCEL);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/parcels/parcel_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 400, body: { weight: ["Required."] } }));
    const parcels = new ParcelsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await parcels
      .create({
        length: "10",
        width: "8",
        height: "4",
        distance_unit: "in",
        weight: "",
        mass_unit: "lb",
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(400);
  });
});
