/**
 * Helper for the live-contract test suite (`src/live-contract.test.ts`).
 * Not part of the published package (excluded from tsconfig.build.json,
 * never imported from src/index.ts).
 *
 * Reads `SHIPPO_TEST_API_KEY` from the environment. When it's unset (the
 * default everywhere except a developer's own machine with a real Shippo
 * test-mode key), `hasLiveKey` is `false` and every live test file should
 * skip itself via `describe.skipIf(!hasLiveKey)`. Never hardcode a key
 * here, never log the key's value, and never let it end up in a
 * committed file — it's a real, if test-mode-scoped, credential.
 */

import { Shippo } from "../index";

export const LIVE_API_KEY = process.env["SHIPPO_TEST_API_KEY"];
export const hasLiveKey = Boolean(LIVE_API_KEY);

/** Constructs a real `Shippo` client from `SHIPPO_TEST_API_KEY`. Throws if unset — guard call sites with `hasLiveKey` / `describe.skipIf`. */
export function createLiveShippo(): Shippo {
  if (!LIVE_API_KEY) {
    throw new Error(
      "createLiveShippo() called without SHIPPO_TEST_API_KEY set. " +
        "Guard call sites with `describe.skipIf(!hasLiveKey)`.",
    );
  }
  return new Shippo({ apiKey: LIVE_API_KEY });
}
