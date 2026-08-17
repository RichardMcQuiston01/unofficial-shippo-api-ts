/**
 * Receives and parses Shippo webhook deliveries using plain Node `http` —
 * no framework dependency. Run with:
 *
 *   SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/webhook-server-node.ts
 *
 * Then point a webhook at this server (see `shippo.webhooks.create()`) or
 * POST a test payload at it directly:
 *
 *   curl -X POST http://localhost:3000/webhooks/shippo \
 *     -H 'content-type: application/json' \
 *     -d '{"event":"track_updated","test":true,"data":{"carrier":"usps","tracking_number":"123"}}'
 *
 * The key point this example demonstrates: Shippo's webhook spec has no
 * signature/shared-secret mechanism (see ROADMAP.md §2 and
 * `parseEvent()`'s own doc comment), so a successfully-parsed payload is
 * NOT proof it came from Shippo. Before acting on anything sensitive,
 * re-fetch the referenced object from the API by its `object_id` and act
 * on THAT, not on the webhook payload directly.
 *
 * This imports from the local source (`../src/index`) since the package
 * isn't published to npm yet. Once it is, replace that import with:
 *
 *   import { parseEvent, Shippo } from "@richardmcquiston01/shippo-api";
 */

import { createServer } from "node:http";

import { parseEvent, Shippo } from "../src/index";

const apiKey = process.env["SHIPPO_TEST_API_KEY"];
const shippo = apiKey ? new Shippo({ apiKey }) : undefined;
if (!apiKey) {
  console.warn(
    "SHIPPO_TEST_API_KEY not set -- the server will still parse webhooks, but can't " +
      "demonstrate the re-fetch-by-object_id mitigation below.",
  );
}

const server = createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405).end();
    return;
  }

  const chunks: Buffer[] = [];
  req.on("data", (chunk: Buffer) => chunks.push(chunk));
  req.on("end", () => {
    void (async () => {
      const rawBody = Buffer.concat(chunks).toString("utf8");

      let event;
      try {
        event = parseEvent(rawBody);
      } catch (error) {
        console.error("Failed to parse webhook payload:", error);
        res.writeHead(400).end();
        return;
      }

      console.log(`Received ${event.event} (test=${event.test})`);

      switch (event.event) {
        case "track_updated": {
          // Don't trust event.data directly for anything that matters --
          // re-fetch the authoritative status from the API.
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

      res.writeHead(200).end();
    })();
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Webhook receiver listening on http://localhost:${port}`);
});
