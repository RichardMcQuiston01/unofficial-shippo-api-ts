import { describe, expect, test } from "bun:test";

import { ShippoClient } from "../client";
import { ShippoApiError } from "../errors";
import { createMockFetch } from "../testing/mock-fetch";
import { CarrierAccountsResource } from "./carrier-accounts";

const SAMPLE_CARRIER_ACCOUNT = {
  object_id: "ca_123",
  carrier: "usps",
  account_id: "user123",
  active: true,
  test: false,
  object_created: "2026-01-01T00:00:00Z",
  object_updated: "2026-01-01T00:00:00Z",
};

describe("CarrierAccountsResource", () => {
  test("list() gets /carrier_accounts with query params and returns a page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [SAMPLE_CARRIER_ACCOUNT] },
    }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const page = await carrierAccounts.list({ page: 1, results: 5 });

    expect(page.results).toEqual([SAMPLE_CARRIER_ACCOUNT]);
    const url = new URL(calls[0]?.url ?? "");
    expect(url.pathname).toBe("/carrier_accounts");
    expect(url.searchParams.get("page")).toBe("1");
    expect(url.searchParams.get("results")).toBe("5");
  });

  test("create() posts to /carrier_accounts and returns the created account", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      status: 201,
      body: SAMPLE_CARRIER_ACCOUNT,
    }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.create({ carrier: "usps", account_id: "user123" });

    expect(result).toEqual(SAMPLE_CARRIER_ACCOUNT);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/carrier_accounts");
    expect(calls[0]?.method).toBe("POST");
  });

  test("get() fetches a single carrier account by ID", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_CARRIER_ACCOUNT }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.get("ca_123");

    expect(result).toEqual(SAMPLE_CARRIER_ACCOUNT);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/carrier_accounts/ca_123");
  });

  test("update() puts to /carrier_accounts/{id} and returns the updated account", async () => {
    const updated = { ...SAMPLE_CARRIER_ACCOUNT, active: false };
    const { fetch, calls } = createMockFetch(() => ({ body: updated }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.update("ca_123", { active: false });

    expect(result.active).toBe(false);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/carrier_accounts/ca_123");
    expect(calls[0]?.method).toBe("PUT");
  });

  test("initiateOauth2Signin() posts to the oauth2 initiate endpoint and returns a redirect URL", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { redirect_url: "https://carrier.example.com/oauth/authorize" },
    }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.initiateOauth2Signin("ups");

    expect(result.redirect_url).toBe("https://carrier.example.com/oauth/authorize");
    expect(calls[0]?.url).toBe("https://api.goshippo.com/carrier_accounts/ups/oauth2/initiate");
    expect(calls[0]?.method).toBe("POST");
  });

  test("register() posts to the register endpoint and returns the carrier account", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: SAMPLE_CARRIER_ACCOUNT }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.register("usps", { account_id: "user123" });

    expect(result).toEqual(SAMPLE_CARRIER_ACCOUNT);
    expect(calls[0]?.url).toBe("https://api.goshippo.com/carrier_accounts/usps/register");
    expect(calls[0]?.method).toBe("POST");
  });

  test("getRegistrationStatus() gets the registration_status endpoint", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: { status: "pending" } }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const result = await carrierAccounts.getRegistrationStatus("ca_123");

    expect(result.status).toBe("pending");
    expect(calls[0]?.url).toBe(
      "https://api.goshippo.com/carrier_accounts/ca_123/registration_status",
    );
  });

  test("propagates ShippoApiError on a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      body: { detail: "Not found." },
    }));
    const carrierAccounts = new CarrierAccountsResource(new ShippoClient({ apiKey: "key", fetch }));

    const error = await carrierAccounts.get("missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect((error as ShippoApiError).status).toBe(404);
  });
});
