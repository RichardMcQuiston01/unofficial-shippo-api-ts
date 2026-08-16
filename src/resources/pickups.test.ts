import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { PickupsResource } from "./pickups";

const SAMPLE_PICKUP = {
  object_id: "pickup_123",
  carrier_account: "carrier_abc",
  location: {
    address: "addr_123",
    instructions: "Ring the bell",
  },
  transactions: ["transaction_123"],
  confirmation_code: "CONF123",
  requested_start_time: "2026-08-17T09:00:00Z",
  requested_end_time: "2026-08-17T12:00:00Z",
  object_created: "2026-08-16T00:00:00Z",
  object_updated: "2026-08-16T00:00:00Z",
};

describe("PickupsResource", () => {
  test("create() posts to /pickups and returns the scheduled pickup", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_PICKUP }));
    const pickups = new PickupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await pickups.create({
      carrier_account: "carrier_abc",
      location: {
        address: "addr_123",
        instructions: "Ring the bell",
      },
      transactions: ["transaction_123"],
      requested_start_time: "2026-08-17T09:00:00Z",
      requested_end_time: "2026-08-17T12:00:00Z",
    });

    expect(result).toEqual(SAMPLE_PICKUP);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/pickups");
    expect(calls[0]?.method).toBe("POST");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 400,
      body: { detail: "carrier_account is required." },
    }));
    const pickups = new PickupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await pickups
      .create({
        carrier_account: "carrier_abc",
        location: { address: "addr_123" },
        transactions: ["transaction_123"],
        requested_start_time: "2026-08-17T09:00:00Z",
        requested_end_time: "2026-08-17T12:00:00Z",
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(400);
  });
});
