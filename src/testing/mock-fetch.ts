/**
 * Test-only helper for exercising `ShippoClient` without real network
 * calls. Not part of the published package (excluded from
 * tsconfig.build.json and never imported from src/index.ts).
 */

export interface MockResponseInit {
  status?: number;
  headers?: Record<string, string>;
  /** JSON-serialized unless already a string, in which case sent as-is. */
  body?: unknown;
}

export interface MockCall {
  url: string;
  method: string | undefined;
  headers: Headers;
  body: string | undefined;
}

export type MockFetchHandler = (
  call: MockCall,
  callIndex: number,
) => MockResponseInit | Promise<MockResponseInit>;

export function createMockFetch(handler: MockFetchHandler): {
  fetch: typeof fetch;
  calls: MockCall[];
} {
  const calls: MockCall[] = [];

  const mockFetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const call: MockCall = {
      url,
      method: init?.method,
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? init.body : undefined,
    };
    calls.push(call);

    const result = await handler(call, calls.length - 1);
    const headers = new Headers(result.headers ?? { "content-type": "application/json" });
    const bodyText =
      result.body === undefined
        ? ""
        : typeof result.body === "string"
          ? result.body
          : JSON.stringify(result.body);

    return new Response(bodyText, { status: result.status ?? 200, headers });
  }) as typeof fetch;

  return { fetch: mockFetch, calls };
}

/** A handler that always rejects, simulating a network failure. */
export function failingFetch(message = "network down"): typeof fetch {
  return (() => Promise.reject(new Error(message))) as unknown as typeof fetch;
}
