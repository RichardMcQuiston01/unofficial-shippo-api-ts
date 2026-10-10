/**
 * The same webhook receiver as webhook-server-node.ts, using Express instead
 * of plain `http`. Run with:
 *
 *   SHIPPO_WEBHOOK_TOKEN=$(openssl rand -hex 24) \
 *   SHIPPO_TEST_API_KEY=shippo_test_... \
 *   bun run examples/webhook-server-express.ts
 *
 * Then, as with the plain-Node example:
 *
 *   curl -X POST "http://127.0.0.1:3000/webhooks/shippo?token=$SHIPPO_WEBHOOK_TOKEN" \
 *     -H 'content-type: application/json' \
 *     -d '{"event":"track_updated","test":true,"data":{"carrier":"usps","tracking_number":"123"}}'
 *
 * Same pattern: authenticate the raw body (URL token and/or HMAC) before
 * parsing, acknowledge with 200 immediately, re-fetch afterward. See
 * `webhook-handler.ts` for the shared logic and the three controls Shippo
 * documents.
 *
 * This imports from the local source (`../src/index`) so it runs against this
 * checkout without a separate install step. In your own app, install the
 * published package and import from it instead:
 *
 *   import { parseEvent, Shippo, verifyWebhookSignature } from "@richardmcquiston01/shippo-api";
 */

import express from "express";

import {
  assertAuthenticationConfigured,
  authenticate,
  handleDelivery,
  LISTEN_HOST,
  MAX_BODY_BYTES,
  parseDelivery,
  WEBHOOK_PATH,
} from "./webhook-handler";

assertAuthenticationConfigured();

const app = express();

// express.text(), not express.json(): HMAC verification needs the exact raw
// bytes, and parseEvent() does its own parsing. The limit is set on purpose.
app.post(WEBHOOK_PATH, express.text({ type: "*/*", limit: MAX_BODY_BYTES }), (req, res) => {
  const rawBody = typeof req.body === "string" ? req.body : "";

  const rejection = authenticate({
    rawBody,
    requestUrl: new URL(req.originalUrl, "http://localhost"),
    signatureHeader: req.get("shippo-auth-signature"),
  });
  if (rejection) {
    console.warn(`Rejected webhook: ${rejection}`);
    res.sendStatus(401);
    return;
  }

  const event = parseDelivery(rawBody);
  if (!event) {
    res.sendStatus(400);
    return;
  }

  // Acknowledge first, then do the slow work.
  res.sendStatus(200);
  void handleDelivery(event, rawBody);
});

const port = 3000;
app.listen(port, LISTEN_HOST, () => {
  console.log(`Webhook receiver listening on http://${LISTEN_HOST}:${port}${WEBHOOK_PATH}`);
});
