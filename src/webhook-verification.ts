import { createHmac, timingSafeEqual } from "node:crypto";

/** Default window (seconds) a signed timestamp may differ from the current time. */
export const DEFAULT_SIGNATURE_TOLERANCE_SEC = 300;

export type WebhookSignatureFailureReason =
  "missing_header" | "malformed_header" | "timestamp_out_of_tolerance" | "signature_mismatch";

export type WebhookSignatureResult =
  | { ok: true; timestamp: number }
  | { ok: false; reason: WebhookSignatureFailureReason; message: string };

export interface VerifyWebhookSignatureOptions {
  /** The exact bytes Shippo sent. Do not re-serialize a parsed body. */
  rawBody: string | Uint8Array;
  /** Value of the `Shippo-Auth-Signature` request header, `t=<unix>,v1=<hex>`. */
  header: string | null | undefined;
  /** The HMAC secret Shippo's solutions team provisioned for your account. */
  secret: string;
  /** Max allowed difference between the signed timestamp and now, in seconds. Default 300. */
  toleranceSec?: number;
  /** Current time in unix seconds. Injectable for tests. */
  nowSec?: number;
}

/**
 * Verifies Shippo's `Shippo-Auth-Signature` header
 * (https://docs.goshippo.com/tracking/webhook-security). The signed string
 * is `${timestamp}.${rawBody}`, HMAC-SHA256, hex-encoded.
 *
 * Never throws on bad input: check `ok` on the result, and do not parse
 * `rawBody` until it is `true`. A failure carries a distinct `reason`.
 * The signature comparison is constant-time and a stale timestamp is
 * rejected to limit replay. HMAC is only available after Shippo enables it
 * for your account; until then use {@link verifyWebhookToken}.
 */
export function verifyWebhookSignature(
  options: VerifyWebhookSignatureOptions,
): WebhookSignatureResult {
  const { rawBody, header, secret } = options;
  const toleranceSec = options.toleranceSec ?? DEFAULT_SIGNATURE_TOLERANCE_SEC;
  const nowSec = options.nowSec ?? Math.floor(Date.now() / 1000);

  if (!header) {
    return fail("missing_header", "The Shippo-Auth-Signature header is missing.");
  }
  if (!secret) {
    return fail("signature_mismatch", "No webhook secret was provided to verify against.");
  }

  let timestamp: number | undefined;
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const separator = part.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (key === "t" && /^\d+$/.test(value)) {
      timestamp = Number(value);
    } else if (key === "v1" && /^[0-9a-fA-F]+$/.test(value)) {
      signatures.push(value);
    }
  }
  if (timestamp === undefined || signatures.length === 0) {
    return fail(
      "malformed_header",
      "The Shippo-Auth-Signature header must look like t=<unix>,v1=<hex>.",
    );
  }

  if (Math.abs(nowSec - timestamp) > toleranceSec) {
    return fail(
      "timestamp_out_of_tolerance",
      `The signed timestamp is more than ${toleranceSec} seconds from the current time.`,
    );
  }

  const body = typeof rawBody === "string" ? Buffer.from(rawBody, "utf8") : Buffer.from(rawBody);
  const expected = createHmac("sha256", secret)
    .update(Buffer.concat([Buffer.from(`${timestamp}.`, "utf8"), body]))
    .digest();

  const matches = signatures.some((signature) => {
    const received = Buffer.from(signature, "hex");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });
  if (!matches) {
    return fail("signature_mismatch", "The webhook signature does not match the payload.");
  }
  return { ok: true, timestamp };
}

/**
 * Constant-time check of the self-generated token you put on your webhook URL
 * (`https://example.com/hooks/shippo?token=...`). Both values are hashed first
 * so the comparison does not leak the expected token's length.
 */
export function verifyWebhookToken(
  receivedToken: string | null | undefined,
  expectedToken: string,
): boolean {
  if (!receivedToken || !expectedToken) {
    return false;
  }
  const digest = (value: string): Buffer =>
    createHmac("sha256", "shippo-webhook-token").update(value).digest();
  return timingSafeEqual(digest(receivedToken), digest(expectedToken));
}

function fail(reason: WebhookSignatureFailureReason, message: string): WebhookSignatureResult {
  return { ok: false, reason, message };
}
