/**
 * Validates an address. Run with:
 *
 *   SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/validate-address.ts
 *
 * This imports from the local source (`../src/index`) since the package
 * isn't published to npm yet. Once it is, replace that import with:
 *
 *   import { Shippo } from "@richardmcquiston01/shippo-api";
 */

import { Shippo } from "../src/index";

const apiKey = process.env["SHIPPO_TEST_API_KEY"];
if (!apiKey) {
  console.error("Set SHIPPO_TEST_API_KEY (a test-mode key from your Shippo account) and retry.");
  process.exit(1);
}

const shippo = new Shippo({ apiKey });

const address = await shippo.addresses.create({
  name: "Ada Lovelace",
  street1: "965 Mission St",
  city: "San Francisco",
  state: "CA",
  zip: "94103",
  country: "US",
});

const validated = await shippo.addresses.validate(address.object_id);

console.log("Address:", validated.object_id);
console.log("is_complete:", validated.is_complete);
console.log("validation_results:", validated.validation_results);
