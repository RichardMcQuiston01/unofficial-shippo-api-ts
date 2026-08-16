/**
 * Live contract test suite (Stage 5 of ROADMAP.md).
 *
 * Skipped entirely unless `SHIPPO_TEST_API_KEY` is set — see
 * `src/testing/live-client.ts` and `CONTRIBUTING.md`'s "Live contract
 * tests" section for how to run this locally. Never runs in CI.
 *
 * Purpose: everything else in this test suite mocks `fetch`, which can
 * only ever confirm the code does what *we assumed* the API does — it
 * can't catch a wrong assumption. This file hits the real Shippo test-
 * mode API to spot-check the things Stages 1-3 flagged as unconfirmed:
 * the error response body shape, and field-level types for resources
 * with no reachable OpenAPI spec. It is intentionally not exhaustive —
 * see the "Known gaps" note at the bottom.
 */

import { describe, expect, test } from "bun:test";

import { ShippoApiError } from "./errors";
import { createLiveShippo, hasLiveKey } from "./testing/live-client";

const liveDescribe = describe.skipIf(!hasLiveKey);

const TEST_ADDRESS_FROM = {
  name: "Ada Lovelace",
  street1: "965 Mission St",
  city: "San Francisco",
  state: "CA",
  zip: "94103",
  country: "US",
};

const TEST_ADDRESS_TO = {
  name: "Alan Turing",
  street1: "215 Clayton St",
  city: "San Francisco",
  state: "CA",
  zip: "94117",
  country: "US",
};

const TEST_PARCEL = {
  length: "10",
  width: "8",
  height: "4",
  distance_unit: "in" as const,
  weight: "2",
  mass_unit: "lb" as const,
};

liveDescribe("live contract: core happy path", () => {
  test("validates a real address and returns validation_results in the shape we guessed", async () => {
    const shippo = createLiveShippo();

    const address = await shippo.addresses.create({ ...TEST_ADDRESS_FROM, validate: true });
    const validated = await shippo.addresses.validate(address.object_id);

    // Log the real shape once, visibly, so a human reviewing live-test
    // output can eyeball it against AddressValidationResults even if the
    // assertions below don't fully pin it down.
    console.log("Live validation_results shape:", JSON.stringify(validated.validation_results));

    expect(validated.object_id).toBe(address.object_id);
    expect(validated.validation_results).toBeDefined();
  });

  test("creates a shipment from inline addresses/parcel and receives rates synchronously", async () => {
    const shippo = createLiveShippo();

    const shipment = await shippo.shipments.create({
      address_from: TEST_ADDRESS_FROM,
      address_to: TEST_ADDRESS_TO,
      parcels: [TEST_PARCEL],
    });

    expect(shipment.object_id).toBeTruthy();
    expect(shipment.status).toBeTruthy();
    expect(Array.isArray(shipment.rates)).toBe(true);
  });

  test("purchases a label for a real rate and gets back a Transaction matching our type", async () => {
    const shippo = createLiveShippo();

    const shipment = await shippo.shipments.create({
      address_from: TEST_ADDRESS_FROM,
      address_to: TEST_ADDRESS_TO,
      parcels: [TEST_PARCEL],
    });
    const rate = shipment.rates?.[0];
    if (!rate) {
      throw new Error("Live shipment returned no rates -- can't continue this test.");
    }

    const transaction = await shippo.transactions.create({
      rate: rate.object_id,
      label_file_type: "PDF",
    });

    expect(transaction.object_id).toBeTruthy();
    expect(transaction.status).toBeTruthy();
    // In test mode this resolves quickly; if Shippo starts returning QUEUED
    // synchronously for test-mode transactions, tracking_number/label_url
    // may be absent here -- that's useful signal, not a failure, so this
    // doesn't hard-assert their presence.
    console.log("Live transaction:", JSON.stringify(transaction));
  });
});

liveDescribe("live contract: error response shape", () => {
  test("a 404 produces a ShippoApiError -- logs the real body for extractDetail() comparison", async () => {
    const shippo = createLiveShippo();

    const error = await shippo.addresses
      .get("obviously_not_a_real_object_id")
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    const apiError = error as ShippoApiError;
    console.log("Live 404 status:", apiError.status);
    console.log("Live 404 body:", JSON.stringify(apiError.body));
    console.log("Live 404 message (extractDetail() output):", apiError.message);
    console.log("Live 404 retryAfterMs:", apiError.retryAfterMs);
  });

  test("a 400 (invalid create payload) also produces an inspectable ShippoApiError", async () => {
    const shippo = createLiveShippo();

    // Missing every required field -- should be rejected with a
    // validation-style error body, if Shippo's shape matches the
    // Django-REST-Framework field-array convention errors.ts assumes.
    const error = await shippo.client
      .request("POST", "/addresses", { body: {} })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    const apiError = error as ShippoApiError;
    console.log("Live 400 status:", apiError.status);
    console.log("Live 400 body:", JSON.stringify(apiError.body));
    console.log("Live 400 message (extractDetail() output):", apiError.message);
  });
});

liveDescribe("live contract: unconfirmed-spec resources (read-only smoke checks)", () => {
  test("list() on every no-spec resource returns the assumed PaginatedList envelope", async () => {
    const shippo = createLiveShippo();

    const checks: Array<[string, () => Promise<{ count: number; results: unknown[] }>]> = [
      ["customsDeclarations", () => shippo.customsDeclarations.list()],
      ["customsItems", () => shippo.customsItems.list()],
      ["manifests", () => shippo.manifests.list()],
      ["orders", () => shippo.orders.list()],
      ["carrierAccounts", () => shippo.carrierAccounts.list()],
      ["carrierParcelTemplates", () => shippo.carrierParcelTemplates.list()],
      ["userParcelTemplates", () => shippo.userParcelTemplates.list()],
      ["serviceGroups", () => shippo.serviceGroups.list()],
    ];

    for (const [name, call] of checks) {
      const page = await call();
      console.log(`Live list() envelope for ${name}:`, JSON.stringify(page).slice(0, 300));
      expect(typeof page.count).toBe("number");
      expect(Array.isArray(page.results)).toBe(true);
    }
  });
});

liveDescribe("live contract: standalone creates for no-spec resources", () => {
  test("creates a CustomsItem matching our guessed CustomsItemCreateRequest shape", async () => {
    const shippo = createLiveShippo();

    const item = await shippo.customsItems.create({
      description: "Live contract test item",
      quantity: 1,
      net_weight: "1",
      mass_unit: "lb",
      value_amount: "10.00",
      value_currency: "USD",
      origin_country: "US",
    });

    expect(item.object_id).toBeTruthy();
    console.log("Live CustomsItem:", JSON.stringify(item));
  });

  test("creates a UserParcelTemplate matching our guessed shape, then cleans it up", async () => {
    const shippo = createLiveShippo();

    const created = await shippo.userParcelTemplates.create({
      name: "Live contract test template",
      ...TEST_PARCEL,
    });
    console.log("Live UserParcelTemplate:", JSON.stringify(created));
    expect(created.object_id).toBeTruthy();

    await shippo.userParcelTemplates.delete(created.object_id ?? "");
  });

  test("creates and deletes a Webhook matching our guessed shape", async () => {
    const shippo = createLiveShippo();

    const webhook = await shippo.webhooks.create({
      url: "https://example.com/shippo-webhook-live-contract-test",
      event: "track_updated",
    });
    console.log("Live Webhook:", JSON.stringify(webhook));
    expect(webhook.object_id).toBeTruthy();
    expect(webhook.event).toBe("track_updated");

    if (webhook.object_id) {
      await shippo.webhooks.delete(webhook.object_id);
    }
  });
});

// Known gaps in this live suite, deliberately not covered:
// - Batches and Pickups need a real, usable carrier account to do
//   anything meaningful (a personal Shippo test account typically has
//   none connected) -- not exercised here.
// - CarrierAccounts' three OAuth2-adjacent methods (initiateOauth2Signin,
//   register, getRegistrationStatus) require completing an interactive
//   OAuth2 redirect flow with a real carrier -- can't be automated here.
// - CustomsDeclarations' create() depends on a valid CustomsItem id,
//   which this file creates but doesn't yet chain into a declaration --
//   left for a follow-up expansion of this suite.
// - RatesAtCheckout is not covered here (rate computation + default
//   parcel template management) -- also left for follow-up.
// Expanding coverage in any of these directions is welcome; this file is
// meant as the scaffold/template to extend, not the final word.
