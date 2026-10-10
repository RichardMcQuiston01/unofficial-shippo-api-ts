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

  test("never dumps an unrecognized object body into the message", () => {
    const error = makeApiError({ parameters: { password: "carrier-secret", account_id: "123" } });
    expect(error.message).not.toContain("carrier-secret");
    expect(error.message).not.toContain("123");
    expect(error.message).toBe(
      "Shippo API request failed with 400 Bad Request (https://api.goshippo.com/addresses)",
    );
    expect(error.body).toEqual({ parameters: { password: "carrier-secret", account_id: "123" } });
  });

  test("omits field errors under sensitive keys", () => {
    const error = makeApiError({
      password: ["too short: hunter2"],
      parameters: ["bad"],
      zip: ["This field is required."],
    });
    expect(error.message).toContain("zip: This field is required.");
    expect(error.message).not.toContain("hunter2");
    expect(error.message).not.toContain("parameters");
  });

  test("ignores arrays that are not lists of strings", () => {
    const error = makeApiError({ items: [{ ssn: "123-45-6789" }], flags: [1, 2] });
    expect(error.message).not.toContain("object Object");
    expect(error.message).not.toContain("123-45-6789");
    expect(error.message).not.toContain("flags");
  });

  test("caps the detail at 500 characters", () => {
    const error = makeApiError({ detail: "x".repeat(5000) });
    expect(error.message.length).toBeLessThan(700);
    expect(error.message).toContain("...");
  });

  test("caps a large string body and a large field-error list", () => {
    expect(makeApiError("y".repeat(5000)).message.length).toBeLessThan(700);
    expect(
      makeApiError({ zip: Array.from({ length: 500 }, () => "bad") }).message.length,
    ).toBeLessThan(700);
  });

  test("omits the query string, fragment, and userinfo from the URL", () => {
    const error = new ShippoApiError({
      status: 400,
      statusText: "Bad Request",
      body: undefined,
      requestId: undefined,
      retryAfterMs: undefined,
      url: "https://user:pw@api.goshippo.com/addresses?name=Jane%20Doe&email=jane@example.com#frag",
    });
    expect(error.message).toContain("https://api.goshippo.com/addresses");
    expect(error.message).not.toContain("Jane");
    expect(error.message).not.toContain("jane@example.com");
    expect(error.message).not.toContain("pw");
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
