import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import {
  CarrierParcelTemplatesResource,
  type CarrierParcelTemplate,
} from "./carrier-parcel-templates";

const SAMPLE_TEMPLATE: CarrierParcelTemplate = {
  token: "USPS_SmallFlatRateBox",
  name: "USPS Small Flat Rate Box",
  carrier: "usps",
  is_variable_dimensions: false,
  length: "8.69",
  width: "5.44",
  height: "1.75",
  distance_unit: "in",
};

describe("CarrierParcelTemplatesResource", () => {
  test("list() gets /parcel-templates and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: { results: [SAMPLE_TEMPLATE] } }));
    const templates = new CarrierParcelTemplatesResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const page = await templates.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_TEMPLATE]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/parcel-templates");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("get() fetches a single carrier parcel template by token", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_TEMPLATE }));
    const templates = new CarrierParcelTemplatesResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const result = await templates.get("USPS_SmallFlatRateBox");

    expect(result).toEqual(SAMPLE_TEMPLATE);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/parcel-templates/USPS_SmallFlatRateBox");
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const templates = new CarrierParcelTemplatesResource(
      new ShippoClient({ apiKey: "key", fetch }),
    );

    const error = await templates.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
