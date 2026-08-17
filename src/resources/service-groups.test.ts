import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { ServiceGroupsResource } from "./service-groups";

const SAMPLE_SERVICE_GROUP = {
  object_id: "sg_123",
  name: "Checkout favorites",
  rate_ids_services: [{ object_id: "rate_1", service_level: "usps_priority" }],
};

describe("ServiceGroupsResource", () => {
  test("list() gets /service_groups with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_SERVICE_GROUP] },
    }));
    const serviceGroups = new ServiceGroupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await serviceGroups.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_SERVICE_GROUP]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/service_groups");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("create() posts to /service_groups and returns the created group", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      status: 201,
      body: SAMPLE_SERVICE_GROUP,
    }));
    const serviceGroups = new ServiceGroupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await serviceGroups.create({
      name: "Checkout favorites",
      rate_ids_services: [{ object_id: "rate_1", service_level: "usps_priority" }],
    });

    expect(result).toEqual(SAMPLE_SERVICE_GROUP);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/service_groups");
    expect(calls[0]?.method).toBe("POST");
  });

  test("update() puts to /service_groups/{id} and returns the updated group", async () => {
    const updated = { ...SAMPLE_SERVICE_GROUP, name: "Renamed favorites" };
    const { fetch, calls } = createMockFetch(() => ({ body: updated }));
    const serviceGroups = new ServiceGroupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await serviceGroups.update("sg_123", { name: "Renamed favorites" });

    expect(result.name).toBe("Renamed favorites");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/service_groups/sg_123");
    expect(calls[0]?.method).toBe("PUT");
  });

  test("delete() sends DELETE to /service_groups/{id} and resolves with no value", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 204 }));
    const serviceGroups = new ServiceGroupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await serviceGroups.delete("sg_123");

    expect(result).toBeUndefined();
    expect(calls[0]?.url).toBe("https://api.goshippo.com/service_groups/sg_123");
    expect(calls[0]?.method).toBe("DELETE");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const serviceGroups = new ServiceGroupsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await serviceGroups.update("missing", { name: "x" }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
