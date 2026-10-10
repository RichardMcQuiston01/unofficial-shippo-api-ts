---
"@richardmcquiston01/shippo-api": minor
---

Webhooks: added `verifyWebhookSignature()` (HMAC `Shippo-Auth-Signature`, constant-time, timestamp tolerance) and `verifyWebhookToken()` (constant-time URL token check), and corrected the docs that claimed Shippo deliveries cannot be authenticated. `parseEvent()` now requires a boolean `test` flag and throws `ShippoError` (with the `SyntaxError` as `cause`) for invalid JSON. `"all"` is now accepted when creating or updating a webhook subscription. The webhook examples now verify before parsing, bind `127.0.0.1`, cap the body, acknowledge before re-fetching, and ignore repeat deliveries. Fixes #41, #42.
