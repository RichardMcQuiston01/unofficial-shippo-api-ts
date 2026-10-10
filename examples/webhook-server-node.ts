/**
 * Receives Shippo webhook deliveries using plain Node `http` -- no framework
 * dependency. Run with:
 *
 *   SHIPPO_WEBHOOK_TOKEN=$(openssl rand -hex 24) \
 *   SHIPPO_TEST_API_KEY=shippo_test_... \
 *   bun run examples/webhook-server-node.ts
 *
 * Register `https://<your-host>/webhooks/shippo?token=<SHIPPO_WEBHOOK_TOKEN>`
 * with `shippo.webhooks.create()` (behind a TLS-terminating proxy; this server
 * binds 127.0.0.1 only), or POST a test payload at it directly:
 *
 *   curl -X POST "http://127.0.0.1:3000/webhooks/shippo?token=$SHIPPO_WEBHOOK_TOKEN" \
 *     -H 'content-type: application/json' \
 *     -d '{"event":"track_updated","test":true,"data":{"carrier":"usps","tracking_number":"123"}}'
 *
 * What this demonstrates (see `webhook-handler.ts` for the shared parts):
 *   - only `POST /webhooks/shippo` is served, with a capped body size
 *   - the URL token and/or `Shippo-Auth-Signature` HMAC is verified against the
 *     RAW body before anything is parsed
 *   - 200 is sent immediately; the API re-fetch runs afterward, so a slow call
 *     can't push the response past Shippo's ~3 second window and trigger retries
 *   - repeat deliveries are ignored
 *
 * This imports from the local source (`../src/index`) so it runs against this
 * checkout without a separate install step. In your own app, install the
 * published package and import from it instead:
 *
 *   import { parseEvent, Shippo, verifyWebhookToken } from "@richardmcquiston01/shippo-api";
 */

import { createServer } from "node:http";

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

const server = createServer((req, res) => {
  const requestUrl = new URL(req.url ?? "/", "http://localhost");
  if (requestUrl.pathname !== WEBHOOK_PATH) {
    res.writeHead(404).end();
    return;
  }
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" }).end();
    return;
  }

  const chunks: Buffer[] = [];
  let receivedBytes = 0;
  let tooLarge = false;

  req.on("data", (chunk: Buffer) => {
    receivedBytes += chunk.length;
    if (receivedBytes > MAX_BODY_BYTES) {
      tooLarge = true;
      res.writeHead(413, { Connection: "close" }).end();
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });

  req.on("end", () => {
    if (tooLarge) {
      return;
    }
    const rawBody = Buffer.concat(chunks).toString("utf8");

    const rejection = authenticate({
      rawBody,
      requestUrl,
      signatureHeader: req.headers["shippo-auth-signature"] as string | undefined,
    });
    if (rejection) {
      console.warn(`Rejected webhook: ${rejection}`);
      res.writeHead(401).end();
      return;
    }

    const event = parseDelivery(rawBody);
    if (!event) {
      res.writeHead(400).end();
      return;
    }

    // Acknowledge first, then do the slow work.
    res.writeHead(200).end();
    void handleDelivery(event, rawBody);
  });
});

const port = 3000;
server.listen(port, LISTEN_HOST, () => {
  console.log(`Webhook receiver listening on http://${LISTEN_HOST}:${port}${WEBHOOK_PATH}`);
});
