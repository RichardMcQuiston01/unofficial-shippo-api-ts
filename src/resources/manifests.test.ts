import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { ManifestsResource, type Manifest } from "./manifests";

const SAMPLE_MANIFEST: Manifest = {
  object_id: "man_123",
  status: "SUCCESS",
  carrier_account: "ca_123",
  shipment_date: "2026-01-01",
  transactions: ["tx_123"],
  documents: ["https://shippo-manifests.s3.amazonaws.com/man_123.pdf"],
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("ManifestsResource", () => {
  test("create() posts to /manifests and returns the created manifest", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_MANIFEST }));
    const manifests = new ManifestsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await manifests.create({
      carrier_account: "ca_123",
      shipment_date: "2026-01-01",
      transactions: ["tx_123"],
    });

    expect(result).toEqual(SAMPLE_MANIFEST);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/manifests");
    expect(calls[0]?.method).toBe("POST");
  });

  test("list() gets /manifests with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_MANIFEST] },
    }));
    const manifests = new ManifestsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await manifests.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_MANIFEST]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/manifests");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single manifest by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_MANIFEST }));
    const manifests = new ManifestsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await manifests.get("man_123");

    expect(result).toEqual(SAMPLE_MANIFEST);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/manifests/man_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const manifests = new ManifestsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await manifests.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
