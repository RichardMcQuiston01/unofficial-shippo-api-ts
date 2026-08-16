import { describe, expect, test } from "bun:test";

import { SDK_VERSION, Shippo } from "./index";

describe("Shippo", () => {
  test("stores the provided API key", () => {
    const client = new Shippo({ apiKey: "shippo_test_placeholder" });

    expect(client.apiKey).toBe("shippo_test_placeholder");
  });
});

describe("SDK_VERSION", () => {
  test("is a semver-shaped string", () => {
    expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
