import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { TransactionsResource, type Transaction } from "./transactions";

const SAMPLE_TRANSACTION: Transaction = {
  object_id: "txn_123",
  status: "SUCCESS",
  tracking_number: "1Z999AA10123456784",
  tracking_url_provider: "https://example.com/track",
  label_url: "https://example.com/label.pdf",
  rate: "rate_123",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("TransactionsResource", () => {
  test("create() posts to /transactions and returns the purchased label", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_TRANSACTION }));
    const transactions = new TransactionsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await transactions.create({ rate: "rate_123", label_file_type: "PDF" });

    expect(result).toEqual(SAMPLE_TRANSACTION);
    expect(calls[0]?.method).toBe("POST");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/transactions");
    expect(JSON.parse(calls[0]?.body ?? "{}")).toEqual({
      rate: "rate_123",
      label_file_type: "PDF",
    });
  });

  test("list() gets /transactions and returns a page", async () => {
    const { fetch } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_TRANSACTION] },
    }));
    const transactions = new TransactionsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await transactions.list();

    expect(page.results).toEqual([SAMPLE_TRANSACTION]);
  });

  test("get() fetches a single transaction by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_TRANSACTION }));
    const transactions = new TransactionsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await transactions.get("txn_123");

    expect(result).toEqual(SAMPLE_TRANSACTION);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/transactions/txn_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 400, body: { rate: ["Invalid rate."] } }));
    const transactions = new TransactionsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await transactions
      .create({ rate: "bad_rate", label_file_type: "PDF" })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(400);
  });
});
