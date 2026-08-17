/**
 * Tracks a shipment. Run with:
 *
 *   SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/track-shipment.ts
 *
 * Optionally pass a real carrier + tracking number from a label you've
 * already purchased (see create-shipment-and-buy-label.ts):
 *
 *   SHIPPO_TEST_API_KEY=... bun run examples/track-shipment.ts usps 1234567890
 *
 * With no arguments, this uses Shippo's documented test-mode tracking
 * numbers (carrier "shippo", tracking numbers like SHIPPO_TRANSIT /
 * SHIPPO_DELIVERED / SHIPPO_RETURNED / SHIPPO_FAILURE / SHIPPO_UNKNOWN)
 * that simulate each status without a real shipment. Noted here from
 * general background knowledge of Shippo's public docs, not verified
 * against this package's own live-contract suite (ROADMAP.md §2) — if
 * it doesn't work for you, pass a real carrier/tracking number instead.
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

const [carrier = "shippo", trackingNumber = "SHIPPO_TRANSIT"] = process.argv.slice(2);

const shippo = new Shippo({ apiKey });

const status = await shippo.tracking.get(carrier, trackingNumber);

console.log("Carrier:", status.carrier);
console.log("Tracking number:", status.tracking_number);
console.log("Status:", status.tracking_status?.status);
console.log("Status details:", status.tracking_status?.status_details);
console.log("History entries:", status.tracking_history?.length ?? 0);
