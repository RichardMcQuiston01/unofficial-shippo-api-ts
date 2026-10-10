import { describe, expect, test } from "bun:test";

import { apiPath } from "./api-path";
import { ShippoClient } from "./client";
import { ShippoError } from "./errors";
import { createMockFetch } from "./testing/mock-fetch";
import { TrackingResource } from "./resources/tracking";
import { TransactionsResource } from "./resources/transactions";

describe("apiPath", () => {
  test("joins the prefix and plain segments", () => {
    expect(apiPath("/shipments", "abc", "rates", "USD")).toBe("/shipments/abc/rates/USD");
  });

  test("encodes /, ?, #, and % so each value stays one segment", () => {
    expect(apiPath("/addresses", "a/b?c=1#d%")).toBe("/addresses/a%2Fb%3Fc%3D1%23d%25");
  });

  test.each(["", ".", ".."])("rejects the segment %p", (segment) => {
    expect(() => apiPath("/transactions", segment)).toThrow(ShippoError);
  });
});

describe("resource path encoding", () => {
  test("TransactionsResource.get cannot traverse to another endpoint", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await new TransactionsResource(client).get("../../refunds/abc?x=1#y");

    const url = new URL(calls[0]?.url ?? "");
    expect(url.origin).toBe("https://api.goshippo.com");
    expect(url.pathname).toBe("/transactions/..%2F..%2Frefunds%2Fabc%3Fx%3D1%23y");
    expect(url.search).toBe("");
  });

  test("TrackingResource.get rejects a bare .. segment", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await expect(new TrackingResource(client).get("..", "../carrier_accounts")).rejects.toThrow(
      ShippoError,
    );
    expect(calls).toHaveLength(0);
  });

  test("TrackingResource.get encodes carrier and tracking number separately", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await new TrackingResource(client).get("usps", "9400/1?2#3");

    expect(new URL(calls[0]?.url ?? "").pathname).toBe("/tracks/usps/9400%2F1%3F2%233");
  });
});
