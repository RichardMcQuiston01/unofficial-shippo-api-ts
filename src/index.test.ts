import { describe, expect, test } from "bun:test";

import { ShippoClient } from "./client";
import { ShippoError } from "./errors";
import { SDK_VERSION, Shippo } from "./index";
import { AddressesResource } from "./resources/addresses";
import { ParcelsResource } from "./resources/parcels";
import { RatesResource } from "./resources/rates";
import { ShipmentsResource } from "./resources/shipments";
import { TrackingResource } from "./resources/tracking";
import { TransactionsResource } from "./resources/transactions";

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
});

describe("SDK_VERSION", () => {
  test("is a semver-shaped string", () => {
    expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
