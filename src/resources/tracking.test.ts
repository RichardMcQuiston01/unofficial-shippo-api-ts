import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { TrackingResource, type TrackingStatus } from "./tracking";

const SAMPLE_TRACKING_STATUS: TrackingStatus = {
  carrier: "usps",
  tracking_number: "1Z999AA10123456784",
  tracking_status: { status: "TRANSIT", status_details: "Departed facility" },
  tracking_history: [{ status: "PRE_TRANSIT" }, { status: "TRANSIT" }],
};

describe("TrackingResource", () => {
  test("create() posts to /tracks and returns the tracking status", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_TRACKING_STATUS }));
    const tracking = new TrackingResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await tracking.create({
      carrier: "usps",
      tracking_number: "1Z999AA10123456784",
    });

    expect(result).toEqual(SAMPLE_TRACKING_STATUS);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/tracks");
  });

  test("get() fetches tracking status by carrier and tracking number", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_TRACKING_STATUS }));
    const tracking = new TrackingResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await tracking.get("usps", "1Z999AA10123456784");

    expect(result).toEqual(SAMPLE_TRACKING_STATUS);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/tracks/usps/1Z999AA10123456784");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 404, body: { detail: "Not found." } }));
    const tracking = new TrackingResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await tracking.get("usps", "missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
