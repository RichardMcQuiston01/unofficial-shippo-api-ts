import { describe, expect, test } from "bun:test";

import { ShippoClient } from "./client";
import { ShippoError } from "./errors";
import { SDK_VERSION, Shippo } from "./index";

describe("Shippo", () => {
  test("constructs an internal ShippoClient from the given options", () => {
    const shippo = new Shippo({ apiKey: "shippo_test_placeholder" });

    expect(shippo.client).toBeInstanceOf(ShippoClient);
  });

  test("rejects a missing API key", () => {
    expect(() => new Shippo({ apiKey: "" })).toThrow(ShippoError);
  });
});

describe("SDK_VERSION", () => {
  test("is a semver-shaped string", () => {
    expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
