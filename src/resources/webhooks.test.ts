import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError, ShippoError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { parseEvent, WebhooksResource, type Webhook } from "./webhooks";
import type { Transaction } from "./transactions";
import type { TrackingStatus } from "./tracking";
import type { Batch } from "./batches";

const SAMPLE_WEBHOOK: Webhook = {
  object_id: "webhook_123",
  url: "https://example.com/hooks/shippo",
  event: "transaction_created",
  active: true,
  is_test: false,
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

const SAMPLE_TRANSACTION: Transaction = {
  object_id: "txn_123",
  status: "SUCCESS",
  tracking_number: "1Z999",
  label_url: "https://example.com/label.pdf",
  rate: "rate_123",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

const SAMPLE_TRACKING_STATUS: TrackingStatus = {
  carrier: "usps",
  tracking_number: "1Z999",
  eta: "2026-01-05T00:00:00Z",
  tracking_status: {
    status: "TRANSIT",
    status_details: "In transit",
    status_date: "2026-01-02T00:00:00Z",
  },
  tracking_history: [],
};

const SAMPLE_BATCH: Batch = {
  object_id: "batch_123",
  status: "SUCCESS",
  object_owner: "user@example.com",
  batch_shipments: [],
  object_results: [],
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("WebhooksResource", () => {
  test("list() gets /webhooks with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_WEBHOOK] },
    }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await webhooks.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_WEBHOOK]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/webhooks");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("create() posts to /webhooks and returns the created webhook", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_WEBHOOK }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await webhooks.create({
      url: "https://example.com/hooks/shippo",
      event: "transaction_created",
    });

    expect(result).toEqual(SAMPLE_WEBHOOK);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/webhooks");
    expect(calls[0]?.method).toBe("POST");
  });

  test("get() fetches a single webhook by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_WEBHOOK }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await webhooks.get("webhook_123");

    expect(result).toEqual(SAMPLE_WEBHOOK);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/webhooks/webhook_123");
  });

  test("update() puts to /webhooks/{id} and returns the updated webhook", async () => {
    const updated = { ...SAMPLE_WEBHOOK, active: false };
    const { fetch, calls } = createMockFetch(() => ({ body: updated }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await webhooks.update("webhook_123", { active: false });

    expect(result.active).toBe(false);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/webhooks/webhook_123");
    expect(calls[0]?.method).toBe("PUT");
    expect(calls[0]?.body).toBe(JSON.stringify({ active: false }));
  });

  test("delete() sends a DELETE request and resolves on a 204", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 204 }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    await expect(webhooks.delete("webhook_123")).resolves.toBeUndefined();

    expect(calls[0]?.url).toBe("https://api.goshippo.com/webhooks/webhook_123");
    expect(calls[0]?.method).toBe("DELETE");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const webhooks = new WebhooksResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await webhooks.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});

describe("parseEvent()", () => {
  test("parses a transaction_created event", () => {
    const result = parseEvent({
      event: "transaction_created",
      test: false,
      data: SAMPLE_TRANSACTION,
    });

    expect(result.event).toBe("transaction_created");
    expect(result.test).toBe(false);
    expect(result.data).toEqual(SAMPLE_TRANSACTION);
  });

  test("parses a transaction_updated event", () => {
    const result = parseEvent({
      event: "transaction_updated",
      test: true,
      data: SAMPLE_TRANSACTION,
    });

    expect(result.event).toBe("transaction_updated");
    expect(result.test).toBe(true);
    expect(result.data).toEqual(SAMPLE_TRANSACTION);
  });

  test("parses a batch_created event", () => {
    const result = parseEvent({
      event: "batch_created",
      test: false,
      data: SAMPLE_BATCH,
    });

    expect(result.event).toBe("batch_created");
    expect(result.data).toEqual(SAMPLE_BATCH);
  });

  test("parses a batch_purchased event", () => {
    const result = parseEvent({
      event: "batch_purchased",
      test: false,
      data: SAMPLE_BATCH,
    });

    expect(result.event).toBe("batch_purchased");
    expect(result.data).toEqual(SAMPLE_BATCH);
  });

  test("parses a track_updated event", () => {
    const result = parseEvent({
      event: "track_updated",
      test: false,
      data: SAMPLE_TRACKING_STATUS,
    });

    expect(result.event).toBe("track_updated");
    expect(result.data).toEqual(SAMPLE_TRACKING_STATUS);
  });

  test("accepts a raw JSON string", () => {
    const rawBody = JSON.stringify({
      event: "track_updated",
      test: false,
      data: SAMPLE_TRACKING_STATUS,
    });

    const result = parseEvent(rawBody);

    expect(result.event).toBe("track_updated");
    expect(result.data).toEqual(SAMPLE_TRACKING_STATUS);
  });

  test("accepts an already-parsed object", () => {
    const result = parseEvent({
      event: "track_updated",
      test: false,
      data: SAMPLE_TRACKING_STATUS,
    });

    expect(result.event).toBe("track_updated");
  });

  test("throws a ShippoError for an unrecognized event value", () => {
    expect(() => parseEvent({ event: "something_else", test: false, data: {} })).toThrow(
      ShippoError,
    );
  });

  test("throws a ShippoError for a malformed payload", () => {
    expect(() => parseEvent("not json")).toThrow();
    expect(() => parseEvent({ event: "transaction_created", test: false })).toThrow(ShippoError);
  });
});
