/**
 * The same webhook receiver as webhook-server-node.ts, using Express
 * instead of plain `http`, to show the same pattern in a framework
 * consumers are likely to already be using. Run with:
 *
 *   SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/webhook-server-express.ts
 *
 * Then, as with the plain-Node example:
 *
 *   curl -X POST http://localhost:3000/webhooks/shippo \
 *     -H 'content-type: application/json' \
 *     -d '{"event":"track_updated","test":true,"data":{"carrier":"usps","tracking_number":"123"}}'
 *
 * Same key point as the plain-Node example: Shippo's webhook spec has no
 * signature/shared-secret mechanism (ROADMAP.md §2), so a successfully-
 * parsed payload is NOT proof it came from Shippo. Re-fetch by
 * `object_id` before acting on anything sensitive.
 *
 * This imports from the local source (`../src/index`) since the package
 * isn't published to npm yet. Once it is, replace that import with:
 *
 *   import { parseEvent, Shippo } from "@richardmcquiston01/shippo-api";
 */

import express from "express";

import { parseEvent, Shippo } from "../src/index";

const apiKey = process.env["SHIPPO_TEST_API_KEY"];
const shippo = apiKey ? new Shippo({ apiKey }) : undefined;
if (!apiKey) {
  console.warn(
    "SHIPPO_TEST_API_KEY not set -- the server will still parse webhooks, but can't " +
      "demonstrate the re-fetch-by-object_id mitigation below.",
  );
}

const app = express();

// express.text(), not express.json(): parseEvent() accepts a raw string
// (or a pre-parsed object) and does its own parsing/validation -- no
// need for Express to parse the body first.
app.post("/webhooks/shippo", express.text({ type: "*/*" }), async (req, res) => {
  let event;
  try {
    event = parseEvent(req.body as string);
  } catch (error) {
    console.error("Failed to parse webhook payload:", error);
    res.sendStatus(400);
    return;
  }

  console.log(`Received ${event.event} (test=${event.test})`);

  switch (event.event) {
    case "track_updated": {
      if (shippo && event.data.carrier && event.data.tracking_number) {
        const authoritative = await shippo.tracking.get(
          event.data.carrier,
          event.data.tracking_number,
        );
        console.log("Re-fetched tracking status:", authoritative.tracking_status?.status);
      }
      break;
    }
    case "transaction_created":
    case "transaction_updated": {
      if (shippo && event.data.object_id) {
        const authoritative = await shippo.transactions.get(event.data.object_id);
        console.log("Re-fetched transaction status:", authoritative.status);
      }
      break;
    }
    case "batch_created":
    case "batch_purchased": {
      if (shippo && event.data.object_id) {
        const authoritative = await shippo.batches.get(event.data.object_id);
        console.log("Re-fetched batch status:", authoritative.status);
      }
      break;
    }
  }

  res.sendStatus(200);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook receiver listening on http://localhost:${port}`);
});
