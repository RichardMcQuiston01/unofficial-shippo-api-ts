import { describe, expect, test } from "bun:test";

import { ShippoClient } from "./client";
import { ShippoError } from "./errors";
import { SDK_VERSION, Shippo } from "./index";
import { AddressesResource } from "./resources/addresses";
import { BatchesResource } from "./resources/batches";
import { CarrierAccountsResource } from "./resources/carrier-accounts";
import { CarrierParcelTemplatesResource } from "./resources/carrier-parcel-templates";
import { CustomsDeclarationsResource } from "./resources/customs-declarations";
import { CustomsItemsResource } from "./resources/customs-items";
import { ManifestsResource } from "./resources/manifests";
import { OrdersResource } from "./resources/orders";
import { ParcelsResource } from "./resources/parcels";
import { PickupsResource } from "./resources/pickups";
import { RatesResource } from "./resources/rates";
import { RatesAtCheckoutResource } from "./resources/rates-at-checkout";
import { RefundsResource } from "./resources/refunds";
import { ServiceGroupsResource } from "./resources/service-groups";
import { ShipmentsResource } from "./resources/shipments";
import { TrackingResource } from "./resources/tracking";
import { TransactionsResource } from "./resources/transactions";
import { UserParcelTemplatesResource } from "./resources/user-parcel-templates";
import { WebhooksResource } from "./resources/webhooks";

describe("Shippo", () => {
  test("constructs an internal ShippoClient from the given options", () => {
    const shippo = new Shippo({ apiKey: "shippo_test_placeholder" });

    expect(shippo.client).toBeInstanceOf(ShippoClient);
  });

  test("rejects a missing API key", () => {
    expect(() => new Shippo({ apiKey: "" })).toThrow(ShippoError);
  });

  test("wires up all Stage 2 resource namespaces", () => {
    const shippo = new Shippo({ apiKey: "shippo_test_placeholder" });

    expect(shippo.addresses).toBeInstanceOf(AddressesResource);
    expect(shippo.parcels).toBeInstanceOf(ParcelsResource);
    expect(shippo.shipments).toBeInstanceOf(ShipmentsResource);
    expect(shippo.rates).toBeInstanceOf(RatesResource);
    expect(shippo.transactions).toBeInstanceOf(TransactionsResource);
    expect(shippo.tracking).toBeInstanceOf(TrackingResource);
  });

  test("wires up all Stage 3 resource namespaces", () => {
    const shippo = new Shippo({ apiKey: "shippo_test_placeholder" });

    expect(shippo.webhooks).toBeInstanceOf(WebhooksResource);
    expect(shippo.batches).toBeInstanceOf(BatchesResource);
    expect(shippo.refunds).toBeInstanceOf(RefundsResource);
    expect(shippo.customsDeclarations).toBeInstanceOf(CustomsDeclarationsResource);
    expect(shippo.customsItems).toBeInstanceOf(CustomsItemsResource);
    expect(shippo.manifests).toBeInstanceOf(ManifestsResource);
    expect(shippo.orders).toBeInstanceOf(OrdersResource);
    expect(shippo.carrierAccounts).toBeInstanceOf(CarrierAccountsResource);
    expect(shippo.carrierParcelTemplates).toBeInstanceOf(CarrierParcelTemplatesResource);
    expect(shippo.userParcelTemplates).toBeInstanceOf(UserParcelTemplatesResource);
    expect(shippo.serviceGroups).toBeInstanceOf(ServiceGroupsResource);
    expect(shippo.pickups).toBeInstanceOf(PickupsResource);
    expect(shippo.ratesAtCheckout).toBeInstanceOf(RatesAtCheckoutResource);
  });
});

describe("SDK_VERSION", () => {
  test("is a semver-shaped string", () => {
    expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
