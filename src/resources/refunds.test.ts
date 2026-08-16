import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { RefundsResource, type Refund } from "./refunds";

const SAMPLE_REFUND: Refund = {
  object_id: "refund_123",
  status: "QUEUED",
  transaction: "txn_123",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("RefundsResource", () => {
  test("list() gets /refunds with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_REFUND] },
    }));
    const refunds = new RefundsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await refunds.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_REFUND]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/refunds");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("create() posts to /refunds and returns the created refund", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_REFUND }));
    const refunds = new RefundsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await refunds.create({ transaction: "txn_123" });

    expect(result).toEqual(SAMPLE_REFUND);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/refunds");
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.body).toBe(JSON.stringify({ transaction: "txn_123" }));
  });

  test("get() fetches a single refund by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_REFUND }));
    const refunds = new RefundsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await refunds.get("refund_123");

    expect(result).toEqual(SAMPLE_REFUND);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/refunds/refund_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const refunds = new RefundsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await refunds.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
