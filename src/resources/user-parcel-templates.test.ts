import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { UserParcelTemplatesResource, type UserParcelTemplate } from "./user-parcel-templates";

const SAMPLE_TEMPLATE: UserParcelTemplate = {
  object_id: "upt_123",
  name: "My standard box",
  length: "10",
  width: "8",
  height: "4",
  distance_unit: "in",
  weight: "2",
  mass_unit: "lb",
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("UserParcelTemplatesResource", () => {
  test("list() gets /user_parcel_templates with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_TEMPLATE] },
    }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await templates.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_TEMPLATE]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/user_parcel_templates");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("create() posts to /user_parcel_templates and returns the created template", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 201, body: SAMPLE_TEMPLATE }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await templates.create({
      name: "My standard box",
      length: "10",
      width: "8",
      height: "4",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    });

    expect(result).toEqual(SAMPLE_TEMPLATE);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/user_parcel_templates");
    expect(calls[0]?.method).toBe("POST");
  });

  test("get() fetches a single user parcel template by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_TEMPLATE }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await templates.get("upt_123");

    expect(result).toEqual(SAMPLE_TEMPLATE);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/user_parcel_templates/upt_123");
  });

  test("update() puts to /user_parcel_templates/{id} and returns the updated template", async () => {
    const updated = { ...SAMPLE_TEMPLATE, name: "My renamed box" };
    const { fetch, calls } = createMockFetch(() => ({ body: updated }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await templates.update("upt_123", { name: "My renamed box" });

    expect(result.name).toBe("My renamed box");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/user_parcel_templates/upt_123");
    expect(calls[0]?.method).toBe("PUT");
  });

  test("delete() sends DELETE to /user_parcel_templates/{id} and resolves with no value", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 204 }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await templates.delete("upt_123");

    expect(result).toBeUndefined();
    expect(calls[0]?.url).toBe("https://api.goshippo.com/user_parcel_templates/upt_123");
    expect(calls[0]?.method).toBe("DELETE");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const templates = new UserParcelTemplatesResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await templates.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
