import { describe, expect, test } from "bun:test";

import { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";

function makeApiError(body: unknown, status = 400) {
  return new ShippoApiError({
    status,
    statusText: "Bad Request",
    body,
    requestId: undefined,
    retryAfterMs: undefined,
    url: "https://api.goshippo.com/addresses",
  });
}

describe("ShippoError", () => {
  test("is an instance of Error with the right name", () => {
    const error = new ShippoError("boom");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ShippoError");
    expect(error.message).toBe("boom");
  });
});

describe("ShippoNetworkError", () => {
  test("is a ShippoError with the right name", () => {
    const error = new ShippoNetworkError("timed out");
    expect(error).toBeInstanceOf(ShippoError);
    expect(error.name).toBe("ShippoNetworkError");
  });
});

describe("ShippoApiError message formatting", () => {
  test("uses a `detail` string body verbatim", () => {
    const error = makeApiError({ detail: "Invalid token." }, 401);
    expect(error.message).toContain("401");
    expect(error.message).toContain("Invalid token.");
  });

  test("joins field-level validation array errors", () => {
    const error = makeApiError({ zip: ["This field is required."], city: ["Too long."] });
    expect(error.message).toContain("zip: This field is required.");
    expect(error.message).toContain("city: Too long.");
  });

  test("falls back to the raw string body", () => {
    const error = makeApiError("Internal Server Error", 500);
    expect(error.message).toContain("Internal Server Error");
  });

  test("falls back to a JSON dump for an unrecognized object shape", () => {
    const error = makeApiError({ weird: "shape", nested: { a: 1 } });
    expect(error.message).toContain('"weird":"shape"');
  });

  test("still produces a usable message for an undefined body", () => {
    const error = makeApiError(undefined, 502);
    expect(error.message).toContain("502");
    expect(error.status).toBe(502);
  });

  test("is a ShippoError and exposes status/body/requestId/retryAfterMs", () => {
    const error = new ShippoApiError({
      status: 429,
      statusText: "Too Many Requests",
      body: { detail: "slow down" },
      requestId: "req_abc",
      retryAfterMs: 1500,
      url: "https://api.goshippo.com/shipments",
    });

    expect(error).toBeInstanceOf(ShippoError);
    expect(error.name).toBe("ShippoApiError");
    expect(error.status).toBe(429);
    expect(error.requestId).toBe("req_abc");
    expect(error.retryAfterMs).toBe(1500);
  });
});
