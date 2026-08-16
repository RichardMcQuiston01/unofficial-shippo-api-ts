const assert = require("node:assert/strict");

const { SDK_VERSION, Shippo } = require("../dist/index.cjs");

const client = new Shippo({ apiKey: "smoke-test" });

assert.equal(client.apiKey, "smoke-test");
assert.match(SDK_VERSION, /^\d+\.\d+\.\d+$/);

console.log(`CJS smoke test passed on Node ${process.version}`);
