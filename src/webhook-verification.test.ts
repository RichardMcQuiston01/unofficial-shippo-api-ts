import { createHmac } from "node:crypto";
import { describe, expect, test } from "bun:test";

import { verifyWebhookSignature, verifyWebhookToken } from "./webhook-verification";

const SECRET = "whsec_test";
const BODY = '{"event":"track_updated","test":false,"data":{}}';
const NOW = 1_800_000_000;

function sign(body: string, timestamp: number, secret = SECRET): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

describe("verifyWebhookSignature", () => {
  test("accepts a valid signature", () => {
    const header = `t=${NOW},v1=${sign(BODY, NOW)}`;

    expect(verifyWebhookSignature({ rawBody: BODY, header, secret: SECRET, nowSec: NOW })).toEqual({
      ok: true,
      timestamp: NOW,
    });
  });

  test("accepts raw bytes and ignores unknown header parts", () => {
    const header = `t=${NOW},v0=deadbeef,v1=${sign(BODY, NOW)}`;

    const result = verifyWebhookSignature({
      rawBody: new TextEncoder().encode(BODY),
      header,
      secret: SECRET,
      nowSec: NOW,
    });

    expect(result.ok).toBe(true);
  });

  test("rejects a tampered body", () => {
    const header = `t=${NOW},v1=${sign(BODY, NOW)}`;

    const result = verifyWebhookSignature({
      rawBody: BODY.replace("false", "true"),
      header,
      secret: SECRET,
      nowSec: NOW,
    });

    expect(result).toMatchObject({ ok: false, reason: "signature_mismatch" });
  });

  test("rejects a signature made with the wrong secret", () => {
    const header = `t=${NOW},v1=${sign(BODY, NOW, "other")}`;

    const result = verifyWebhookSignature({ rawBody: BODY, header, secret: SECRET, nowSec: NOW });

    expect(result).toMatchObject({ ok: false, reason: "signature_mismatch" });
  });

  test("rejects a wrong-length signature without throwing", () => {
    const result = verifyWebhookSignature({
      rawBody: BODY,
      header: `t=${NOW},v1=abcd`,
      secret: SECRET,
      nowSec: NOW,
    });

    expect(result).toMatchObject({ ok: false, reason: "signature_mismatch" });
  });

  test("rejects a timestamp outside the tolerance window", () => {
    const old = NOW - 301;
    const header = `t=${old},v1=${sign(BODY, old)}`;

    const result = verifyWebhookSignature({ rawBody: BODY, header, secret: SECRET, nowSec: NOW });

    expect(result).toMatchObject({ ok: false, reason: "timestamp_out_of_tolerance" });
  });

  test("honors a custom tolerance", () => {
    const old = NOW - 301;
    const header = `t=${old},v1=${sign(BODY, old)}`;

    const result = verifyWebhookSignature({
      rawBody: BODY,
      header,
      secret: SECRET,
      nowSec: NOW,
      toleranceSec: 600,
    });

    expect(result.ok).toBe(true);
  });

  test.each([undefined, null, ""])("reports a missing header (%p)", (header) => {
    const result = verifyWebhookSignature({ rawBody: BODY, header, secret: SECRET, nowSec: NOW });

    expect(result).toMatchObject({ ok: false, reason: "missing_header" });
  });

  test.each(["garbage", `t=${NOW}`, "v1=abcd", `t=abc,v1=${"a".repeat(64)}`])(
    "reports a malformed header %p",
    (header) => {
      const result = verifyWebhookSignature({ rawBody: BODY, header, secret: SECRET, nowSec: NOW });

      expect(result).toMatchObject({ ok: false, reason: "malformed_header" });
    },
  );
});

describe("verifyWebhookToken", () => {
  test("accepts a matching token", () => {
    expect(verifyWebhookToken("s3cret-token", "s3cret-token")).toBe(true);
  });

  test.each([["wrong"], ["s3cret-token-longer"], [""], [null], [undefined]])(
    "rejects %p",
    (received) => {
      expect(verifyWebhookToken(received, "s3cret-token")).toBe(false);
    },
  );

  test("rejects an empty expected token", () => {
    expect(verifyWebhookToken("", "")).toBe(false);
  });
});
