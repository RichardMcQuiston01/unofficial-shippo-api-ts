import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { BatchesResource, type Batch } from "./batches";

const SAMPLE_BATCH: Batch = {
  object_id: "batch_123",
  status: "VALID",
  object_owner: "user@example.com",
  default_carrier_account: "carrier_123",
  default_servicelevel_token: "usps_priority",
  label_filetype: "PDF",
  batch_shipments: [],
  object_results: [],
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("BatchesResource", () => {
  test("create() posts to /batches and returns the created batch", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_BATCH }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await batches.create({
      default_carrier_account: "carrier_123",
      default_servicelevel_token: "usps_priority",
    });

    expect(result).toEqual(SAMPLE_BATCH);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/batches");
    expect(calls[0]?.method).toBe("POST");
  });

  test("get() fetches a single batch by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_BATCH }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await batches.get("batch_123");

    expect(result).toEqual(SAMPLE_BATCH);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/batches/batch_123");
  });

  test("addShipments() posts shipment IDs to the add_shipments endpoint", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_BATCH }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await batches.addShipments("batch_123", ["ship_1", "ship_2"]);

    expect(result).toEqual(SAMPLE_BATCH);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/batches/batch_123/add_shipments");
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.body).toBe(JSON.stringify({ shipments: ["ship_1", "ship_2"] }));
  });

  test("purchase() posts to the purchase endpoint", async () => {
    const purchased = { ...SAMPLE_BATCH, status: "SUCCESS" };
    const { fetch, calls } = createMockFetch(() => ({ body: purchased }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await batches.purchase("batch_123");

    expect(result.status).toBe("SUCCESS");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/batches/batch_123/purchase");
    expect(calls[0]?.method).toBe("POST");
  });

  test("removeShipments() posts shipment IDs to the remove_shipments endpoint", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_BATCH }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await batches.removeShipments("batch_123", ["ship_1"]);

    expect(result).toEqual(SAMPLE_BATCH);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/batches/batch_123/remove_shipments");
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.body).toBe(JSON.stringify({ shipments: ["ship_1"] }));
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const batches = new BatchesResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await batches.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
