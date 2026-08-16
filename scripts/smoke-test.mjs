import assert from "node:assert/strict";

import { SDK_VERSION, Shippo, ShippoApiError, ShippoClient } from "../dist/index.js";

const shippo = new Shippo({ apiKey: "smoke-test" });

assert.ok(shippo.client instanceof ShippoClient);
assert.equal(shippo.client.baseUrl, "https://api.goshippo.com");
assert.equal(typeof shippo.client.request, "function");
assert.equal(typeof ShippoApiError, "function");
assert.match(SDK_VERSION, /^\d+\.\d+\.\d+$/);

console.log(`ESM smoke test passed on Node ${process.version}`);
