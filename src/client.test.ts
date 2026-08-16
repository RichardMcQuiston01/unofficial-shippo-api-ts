import { describe, expect, test } from "bun:test";

import { ShippoClient } from "./client";
import { ShippoApiError, ShippoError, ShippoNetworkError } from "./errors";
import { createMockFetch, failingFetch } from "./testing/mock-fetch";

const FAST_RETRY = { retryDelayMs: 1 };

describe("ShippoClient construction", () => {
  test("rejects an empty apiKey", () => {
    expect(() => new ShippoClient({ apiKey: "" })).toThrow(ShippoError);
  });

  test("defaults baseUrl to https://api.goshippo.com", () => {
    const client = new ShippoClient({ apiKey: "key" });
    expect(client.baseUrl).toBe("https://api.goshippo.com");
  });
});

describe("request headers", () => {
  test("sends Authorization as ShippoToken <apiKey> and Accept: application/json", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "abc123", fetch });

    await client.request("GET", "/addresses");

    expect(calls[0]?.headers.get("authorization")).toBe("ShippoToken abc123");
    expect(calls[0]?.headers.get("accept")).toBe("application/json");
  });

  test("omits Content-Type when there is no body", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await client.request("GET", "/addresses");

    expect(calls[0]?.headers.get("content-type")).toBeNull();
  });

  test("sets Content-Type: application/json and serializes the body when present", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await client.request("POST", "/addresses", { body: { name: "Ada" } });

    expect(calls[0]?.headers.get("content-type")).toBe("application/json");
    expect(calls[0]?.body).toBe(JSON.stringify({ name: "Ada" }));
  });

  test("omits shippo-api-version when not configured", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    await client.request("GET", "/addresses");

    expect(calls[0]?.headers.get("shippo-api-version")).toBeNull();
  });

  test("sends shippo-api-version when configured", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", apiVersion: "2018-02-08", fetch });

    await client.request("GET", "/addresses");

    expect(calls[0]?.headers.get("shippo-api-version")).toBe("2018-02-08");
  });
});

describe("URL building", () => {
  test("resolves a relative path against baseUrl", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, baseUrl: "https://example.test" });

    await client.request("GET", "/addresses");

    expect(calls[0]?.url).toBe("https://example.test/addresses");
  });

  test("appends query params, skipping undefined values", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, baseUrl: "https://example.test" });

    await client.request("GET", "/addresses", {
      query: { page: 2, results: 10, unused: undefined },
    });

    const url = new URL(calls[0]?.url ?? "");
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("results")).toBe("10");
    expect(url.searchParams.has("unused")).toBe(false);
  });

  test("uses an absolute path verbatim, bypassing baseUrl", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, baseUrl: "https://example.test" });

    await client.request("GET", "https://elsewhere.test/addresses?page=2");

    expect(calls[0]?.url).toBe("https://elsewhere.test/addresses?page=2");
  });
});

describe("response handling", () => {
  test("parses a JSON success body", async () => {
    const { fetch } = createMockFetch(() => ({ body: { object_id: "abc" } }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const result = await client.request<{ object_id: string }>("GET", "/addresses/abc");

    expect(result).toEqual({ object_id: "abc" });
  });

  test("returns undefined for a 204 No Content response", async () => {
    const { fetch } = createMockFetch(() => ({ status: 204 }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const result = await client.request("DELETE", "/webhooks/abc");

    expect(result).toBeUndefined();
  });

  test("returns raw text for a non-JSON success body", async () => {
    const { fetch } = createMockFetch(() => ({
      headers: { "content-type": "text/plain" },
      body: "pong",
    }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const result = await client.request("GET", "/ping");

    expect(result).toBe("pong");
  });
});

describe("error mapping", () => {
  test("throws ShippoApiError with status, body, and request id for a non-2xx response", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 404,
      headers: { "content-type": "application/json", "x-request-id": "req_123" },
      body: { detail: "Not found." },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const error = await client.request("GET", "/addresses/missing").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    const apiError = error as ShippoApiError;
    expect(apiError.status).toBe(404);
    expect(apiError.body).toEqual({ detail: "Not found." });
    expect(apiError.requestId).toBe("req_123");
    expect(apiError.message).toContain("Not found.");
  });

  test("formats field-level validation errors into the message", async () => {
    const { fetch } = createMockFetch(() => ({
      status: 400,
      body: { zip: ["This field is required."] },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const error = (await client
      .request("POST", "/addresses")
      .catch((e: unknown) => e)) as ShippoApiError;

    expect(error.message).toContain("zip: This field is required.");
  });

  test("wraps a fetch rejection in ShippoNetworkError", async () => {
    const client = new ShippoClient({
      apiKey: "key",
      fetch: failingFetch("DNS lookup failed"),
      maxRetries: 0,
    });

    const error = await client.request("GET", "/addresses").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoNetworkError);
    expect((error as ShippoNetworkError).message).toContain("DNS lookup failed");
  });
});

describe("retries", () => {
  test("retries 5xx responses and succeeds once the server recovers", async () => {
    const { fetch, calls } = createMockFetch((_call, index) =>
      index < 2 ? { status: 503, body: { detail: "unavailable" } } : { body: { ok: true } },
    );
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    const result = await client.request("GET", "/addresses");

    expect(result).toEqual({ ok: true });
    expect(calls.length).toBe(3);
  });

  test("gives up after maxRetries and throws the last error", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 500, body: { detail: "down" } }));
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    const error = await client.request("GET", "/addresses").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoApiError);
    expect(calls.length).toBe(3); // initial attempt + 2 retries
  });

  test("does not retry a non-retryable 4xx status", async () => {
    const { fetch, calls } = createMockFetch(() => ({ status: 404, body: { detail: "gone" } }));
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    await client.request("GET", "/addresses").catch(() => undefined);

    expect(calls.length).toBe(1);
  });

  test("honors a Retry-After: 0 header on a 429 instead of exponential backoff", async () => {
    const { fetch, calls } = createMockFetch((_call, index) =>
      index === 0
        ? { status: 429, headers: { "retry-after": "0" }, body: { detail: "slow down" } }
        : { body: { ok: true } },
    );
    const client = new ShippoClient({ apiKey: "key", fetch, retryDelayMs: 5000, maxRetries: 1 });

    const result = await client.request("GET", "/addresses");

    expect(result).toEqual({ ok: true });
    expect(calls.length).toBe(2);
  });

  test("retries network errors up to maxRetries", async () => {
    let attempts = 0;
    const flakyFetch = (async () => {
      attempts += 1;
      if (attempts < 2) {
        throw new Error("ECONNRESET");
      }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch;
    const client = new ShippoClient({
      apiKey: "key",
      fetch: flakyFetch,
      ...FAST_RETRY,
      maxRetries: 2,
    });

    const result = await client.request("GET", "/addresses");

    expect(result).toEqual({ ok: true });
    expect(attempts).toBe(2);
  });
});

describe("timeout", () => {
  test("aborts the request once timeoutMs elapses", async () => {
    const neverResolvingFetch = ((_input: string, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    }) as typeof fetch;
    const client = new ShippoClient({
      apiKey: "key",
      fetch: neverResolvingFetch,
      timeoutMs: 20,
      maxRetries: 0,
    });

    const error = await client.request("GET", "/addresses").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoNetworkError);
  });
});
