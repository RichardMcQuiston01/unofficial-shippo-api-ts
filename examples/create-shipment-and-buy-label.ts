/**
 * The core happy path: create a shipment from two addresses and a parcel,
 * pick the cheapest rate, and buy a label for it. Run with:
 *
 *   SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/create-shipment-and-buy-label.ts
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

const shipment = await shippo.shipments.create({
  address_from: {
    name: "Ada Lovelace",
    street1: "965 Mission St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "US",
  },
  address_to: {
    name: "Alan Turing",
    street1: "215 Clayton St",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "US",
  },
  parcels: [
    { length: "10", width: "8", height: "4", distance_unit: "in", weight: "2", mass_unit: "lb" },
  ],
});

console.log(`Shipment ${shipment.object_id} has ${shipment.rates?.length ?? 0} rate(s).`);

const [cheapest] = [...(shipment.rates ?? [])].sort((a, b) => Number(a.amount) - Number(b.amount));
if (!cheapest) {
  console.error("No rates were returned for this shipment.");
  process.exit(1);
}

console.log(
  `Buying the cheapest rate: ${cheapest.provider} ${cheapest.servicelevel?.name} for $${cheapest.amount}`,
);

const transaction = await shippo.transactions.create({
  rate: cheapest.object_id,
  label_file_type: "PDF",
});

console.log("Transaction:", transaction.object_id, transaction.status);
console.log("Label URL:", transaction.label_url);
console.log("Tracking number:", transaction.tracking_number);
