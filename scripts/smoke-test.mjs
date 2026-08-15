import assert from "node:assert/strict";

import { SDK_VERSION, Shippo } from "../dist/index.js";

const client = new Shippo({ apiKey: "smoke-test" });

assert.equal(client.apiKey, "smoke-test");
assert.match(SDK_VERSION, /^\d+\.\d+\.\d+$/);

console.log(`ESM smoke test passed on Node ${process.version}`);
