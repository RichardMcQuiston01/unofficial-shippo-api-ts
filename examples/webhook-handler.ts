/**
 * Logic shared by `webhook-server-node.ts` and `webhook-server-express.ts`:
 * authenticating a delivery, then handling it AFTER the 200 has been sent.
 *
 * Shippo documents three controls (https://docs.goshippo.com/tracking/webhook-security):
 *
 *   1. Inbound IP allowlist (published US/EU ranges) -- a network control you
 *      configure at your firewall/proxy, not something this code can enforce.
 *   2. A self-generated token you append to the webhook URL, `?token=...`.
 *      Available to every account, so this is the one most people can use today.
 *      Set `SHIPPO_WEBHOOK_TOKEN` and register `https://you.example/webhooks/shippo?token=<it>`.
 *   3. HMAC via the `Shippo-Auth-Signature` header. Not self-serve: Shippo's
 *      solutions team enables it and shares the secret. Set `SHIPPO_WEBHOOK_SECRET`.
 *
 * Every control that is configured must pass. Authentication runs on the raw
 * request BEFORE anything is parsed.
 */

import { createHash } from "node:crypto";

import { parseEvent, Shippo, verifyWebhookSignature, verifyWebhookToken } from "../src/index";
import type { ShippoWebhookEvent } from "../src/index";

export const WEBHOOK_PATH = "/webhooks/shippo";
/** Shippo payloads are small; reject anything larger instead of buffering it. */
export const MAX_BODY_BYTES = 64 * 1024;
/** Bind to loopback; put a reverse proxy (with TLS) in front for public traffic. */
export const LISTEN_HOST = "127.0.0.1";

const webhookToken = process.env["SHIPPO_WEBHOOK_TOKEN"];
const webhookSecret = process.env["SHIPPO_WEBHOOK_SECRET"];
const apiKey = process.env["SHIPPO_TEST_API_KEY"];
const shippo = apiKey ? new Shippo({ apiKey }) : undefined;

export function assertAuthenticationConfigured(): void {
  if (!webhookToken && !webhookSecret) {
    console.error(
      "Set SHIPPO_WEBHOOK_TOKEN (URL token) and/or SHIPPO_WEBHOOK_SECRET (HMAC) -- " +
        "refusing to accept unauthenticated webhooks.",
    );
    process.exit(1);
  }
  if (!apiKey) {
    console.warn("SHIPPO_TEST_API_KEY not set -- deliveries will be verified but not re-fetched.");
  }
}

/** Returns `undefined` when the request is authentic, otherwise why it was rejected. */
export function authenticate(request: {
  rawBody: string;
  requestUrl: URL;
  signatureHeader: string | undefined;
}): string | undefined {
  if (
    webhookToken &&
    !verifyWebhookToken(request.requestUrl.searchParams.get("token"), webhookToken)
  ) {
    return "invalid or missing URL token";
  }
  if (webhookSecret) {
    const result = verifyWebhookSignature({
      rawBody: request.rawBody,
      header: request.signatureHeader,
      secret: webhookSecret,
    });
    if (!result.ok) {
      return `signature check failed (${result.reason})`;
    }
  }
  return undefined;
}

/** Parses an authenticated body; returns `undefined` (after logging) if it is malformed. */
export function parseDelivery(rawBody: string): ShippoWebhookEvent | undefined {
  try {
    return parseEvent(rawBody);
  } catch (error) {
    console.error(
      "Rejected malformed webhook payload:",
      error instanceof Error ? error.message : error,
    );
    return undefined;
  }
}

const seenDeliveries = new Set<string>();
const MAX_REMEMBERED_DELIVERIES = 1000;

/**
 * Shippo retries a delivery that is not acknowledged with a 2xx within a few
 * seconds, so the same body can arrive more than once. Skip repeats.
 * (In-memory only: use a shared store if you run more than one instance.)
 */
function isDuplicate(rawBody: string): boolean {
  const fingerprint = createHash("sha256").update(rawBody).digest("hex");
  if (seenDeliveries.has(fingerprint)) {
    return true;
  }
  if (seenDeliveries.size >= MAX_REMEMBERED_DELIVERIES) {
    const oldest = seenDeliveries.values().next().value;
    if (oldest !== undefined) {
      seenDeliveries.delete(oldest);
    }
  }
  seenDeliveries.add(fingerprint);
  return false;
}

/**
 * Call this only AFTER responding 200: the re-fetches below are API calls that
 * can outlast Shippo's acknowledgement window. Errors are logged, not thrown,
 * because nobody is waiting on this promise.
 */
export async function handleDelivery(event: ShippoWebhookEvent, rawBody: string): Promise<void> {
  if (isDuplicate(rawBody)) {
    console.log(`Skipping duplicate ${event.event} delivery`);
    return;
  }
  console.log(`Received ${event.event} (test=${event.test})`);
  if (!shippo) {
    return;
  }

  try {
    // The payload is a trigger; act on the authoritative object from the API.
    switch (event.event) {
      case "track_updated": {
        if (event.data.carrier && event.data.tracking_number) {
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
        if (event.data.object_id) {
          const authoritative = await shippo.transactions.get(event.data.object_id);
          console.log("Re-fetched transaction status:", authoritative.status);
        }
        break;
      }
      case "batch_created":
      case "batch_purchased": {
        if (event.data.object_id) {
          const authoritative = await shippo.batches.get(event.data.object_id);
          console.log("Re-fetched batch status:", authoritative.status);
        }
        break;
      }
    }
  } catch (error) {
    console.error(
      `Failed to process ${event.event}:`,
      error instanceof Error ? error.message : error,
    );
  }
}
