import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import type { CustomsItem } from "./customs-items";
import { CustomsDeclarationsResource, type CustomsDeclaration } from "./customs-declarations";

const SAMPLE_CUSTOMS_ITEM: CustomsItem = {
  object_id: "ci_123",
  description: "T-shirt",
  quantity: 2,
  net_weight: "0.5",
  mass_unit: "lb",
  value_amount: "20.00",
  value_currency: "USD",
  origin_country: "US",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

const SAMPLE_CUSTOMS_DECLARATION: CustomsDeclaration = {
  object_id: "cd_123",
  contents_type: "MERCHANDISE",
  items: [SAMPLE_CUSTOMS_ITEM],
  certify: true,
  certify_signer: "Ada Lovelace",
  non_delivery_option: "RETURN",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("CustomsDeclarationsResource", () => {
  test("create() posts to /customs/declarations and returns the created declaration", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      status: 201,
      body: SAMPLE_CUSTOMS_DECLARATION,
    }));
    const customsDeclarations = new CustomsDeclarationsResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const result = await customsDeclarations.create({
      contents_type: "MERCHANDISE",
      items: ["ci_123"],
      certify: true,
      certify_signer: "Ada Lovelace",
      non_delivery_option: "RETURN",
    });

    expect(result).toEqual(SAMPLE_CUSTOMS_DECLARATION);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/customs/declarations");
    expect(calls[0]?.method).toBe("POST");
  });

  test("list() gets /customs/declarations with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_CUSTOMS_DECLARATION] },
    }));
    const customsDeclarations = new CustomsDeclarationsResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const page = await customsDeclarations.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_CUSTOMS_DECLARATION]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/customs/declarations");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single customs declaration by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_CUSTOMS_DECLARATION }));
    const customsDeclarations = new CustomsDeclarationsResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const result = await customsDeclarations.get("cd_123");

    expect(result).toEqual(SAMPLE_CUSTOMS_DECLARATION);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/customs/declarations/cd_123");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const customsDeclarations = new CustomsDeclarationsResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const error = await customsDeclarations.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
