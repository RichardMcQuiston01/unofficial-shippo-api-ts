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

  test("accepts an absolute URL on the configured origin", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, baseUrl: "https://example.test" });

    await client.request("GET", "https://example.test/addresses?page=2");

    expect(calls[0]?.url).toBe("https://example.test/addresses?page=2");
  });

  test.each([
    "https://evil.example/steal",
    "http://example.test/addresses",
    "https://example.test:8443/addresses",
    "@evil.example/steal",
    ".evil.example/steal",
    "addresses",
    "",
  ])("rejects %p without calling fetch or sending the token", async (path) => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, baseUrl: "https://example.test" });

    await expect(client.request("GET", path)).rejects.toBeInstanceOf(ShippoError);
    expect(calls).toHaveLength(0);
  });

  test("does not follow redirects", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      status: 302,
      headers: { location: "https://evil.example/steal" },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    await expect(client.request("GET", "/addresses")).rejects.toBeInstanceOf(ShippoApiError);
    expect(calls).toHaveLength(1);
  });
});

describe("baseUrl validation", () => {
  test("rejects a non-https baseUrl", () => {
    expect(() => new ShippoClient({ apiKey: "key", baseUrl: "http://api.goshippo.com" })).toThrow(
      ShippoError,
    );
  });

  test("rejects a baseUrl that is not a URL", () => {
    expect(() => new ShippoClient({ apiKey: "key", baseUrl: "not a url" })).toThrow(ShippoError);
  });

  test.each(["http://localhost:3000", "http://127.0.0.1:8080", "http://[::1]:8080"])(
    "allows loopback http baseUrl %p",
    (baseUrl) => {
      expect(() => new ShippoClient({ apiKey: "key", baseUrl })).not.toThrow();
    },
  );
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

describe("retry policy", () => {
  test.each(["POST", "PATCH"] as const)("does not retry a %s on a 5xx response", async (method) => {
    const { fetch, calls } = createMockFetch(() => ({ status: 503, body: { detail: "down" } }));
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    await client.request(method, "/transactions", { body: {} }).catch(() => undefined);

    expect(calls.length).toBe(1);
  });

  test("does not retry a POST after a network error", async () => {
    let attempts = 0;
    const droppedFetch = (async () => {
      attempts += 1;
      throw new Error("ECONNRESET");
    }) as unknown as typeof fetch;
    const client = new ShippoClient({
      apiKey: "key",
      fetch: droppedFetch,
      ...FAST_RETRY,
      maxRetries: 2,
    });

    await client.request("POST", "/transactions", { body: {} }).catch(() => undefined);

    expect(attempts).toBe(1);
  });

  test("retries a POST on 429, since Shippo did not act on it", async () => {
    const { fetch, calls } = createMockFetch((_call, index) =>
      index === 0 ? { status: 429, body: { detail: "slow down" } } : { body: { ok: true } },
    );
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    const result = await client.request("POST", "/transactions", { body: {} });

    expect(result).toEqual({ ok: true });
    expect(calls.length).toBe(2);
  });

  test("retries a POST on 5xx when retryNonIdempotent is set", async () => {
    const { fetch, calls } = createMockFetch((_call, index) =>
      index === 0 ? { status: 503, body: { detail: "down" } } : { body: { ok: true } },
    );
    const client = new ShippoClient({
      apiKey: "key",
      fetch,
      ...FAST_RETRY,
      maxRetries: 2,
      retryNonIdempotent: true,
    });

    await client.request("POST", "/transactions", { body: {} });

    expect(calls.length).toBe(2);
  });

  test("retries DELETE and PUT on 5xx", async () => {
    for (const method of ["DELETE", "PUT"] as const) {
      const { fetch, calls } = createMockFetch((_call, index) =>
        index === 0 ? { status: 502, body: {} } : { body: {} },
      );
      const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 1 });

      await client.request(method, "/webhooks/abc");

      expect(calls.length).toBe(2);
    }
  });

  test("an already-aborted signal makes no fetch call and does not retry", async () => {
    const { fetch, calls } = createMockFetch(() => ({ body: {} }));
    const client = new ShippoClient({ apiKey: "key", fetch, ...FAST_RETRY, maxRetries: 2 });

    const error = await client
      .request("GET", "/addresses", { signal: AbortSignal.abort() })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoNetworkError);
    expect(calls.length).toBe(0);
  });

  test("a caller abort during fetch is not retried", async () => {
    const controller = new AbortController();
    let attempts = 0;
    const abortingFetch = (async () => {
      attempts += 1;
      controller.abort();
      throw new DOMException("aborted", "AbortError");
    }) as unknown as typeof fetch;
    const client = new ShippoClient({
      apiKey: "key",
      fetch: abortingFetch,
      ...FAST_RETRY,
      maxRetries: 2,
    });

    const error = await client
      .request("GET", "/addresses", { signal: controller.signal })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoNetworkError);
    expect(attempts).toBe(1);
  });

  test("aborting during backoff cancels the sleep immediately", async () => {
    const controller = new AbortController();
    const { fetch, calls } = createMockFetch(() => ({
      status: 503,
      headers: { "retry-after": "30" },
      body: {},
    }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 2 });

    const started = Date.now();
    const pending = client.request("GET", "/addresses", { signal: controller.signal });
    setTimeout(() => controller.abort(), 20);
    const error = await pending.catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ShippoNetworkError);
    expect(calls.length).toBe(1);
    expect(Date.now() - started).toBeLessThan(1000);
  });

  test("caps Retry-After at 60 seconds", async () => {
    const realSetTimeout = globalThis.setTimeout;
    const delays: number[] = [];
    globalThis.setTimeout = ((handler: () => void, ms?: number) => {
      delays.push(ms ?? 0);
      return realSetTimeout(handler, 0);
    }) as unknown as typeof setTimeout;
    try {
      const { fetch } = createMockFetch((_call, index) =>
        index === 0
          ? { status: 429, headers: { "retry-after": "86400" }, body: {} }
          : { body: { ok: true } },
      );
      const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 1 });

      await client.request("GET", "/addresses");
    } finally {
      globalThis.setTimeout = realSetTimeout;
    }

    expect(delays).toContain(60_000);
    expect(Math.max(...delays)).toBe(60_000);
  });

  test.each([
    ["maxRetries NaN", { maxRetries: Number.NaN }],
    ["maxRetries negative", { maxRetries: -1 }],
    ["maxRetries fractional", { maxRetries: 1.5 }],
    ["retryDelayMs Infinity", { retryDelayMs: Number.POSITIVE_INFINITY }],
    ["retryDelayMs negative", { retryDelayMs: -5 }],
    ["timeoutMs NaN", { timeoutMs: Number.NaN }],
    ["timeoutMs zero", { timeoutMs: 0 }],
  ])("rejects %s in the constructor", (_name, options) => {
    expect(() => new ShippoClient({ apiKey: "key", ...options })).toThrow(ShippoError);
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
