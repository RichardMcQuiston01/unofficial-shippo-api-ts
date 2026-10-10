import { describe, expect, test } from "bun:test";

import { ShippoClient } from "./client";
import { ShippoError } from "./errors";
import { paginate } from "./pagination";
import { createMockFetch } from "./testing/mock-fetch";

interface Address {
  object_id: string;
}

describe("paginate", () => {
  test("yields every item across all pages, following next", async () => {
    const { fetch, calls } = createMockFetch((_call, index) => {
      if (index === 0) {
        return {
          body: {
            count: 3,
            next: "https://api.goshippo.com/addresses?page=2",
            previous: null,
            results: [{ object_id: "a" }, { object_id: "b" }],
          },
        };
      }
      return {
        body: {
          count: 3,
          next: null,
          previous: "https://api.goshippo.com/addresses?page=1",
          results: [{ object_id: "c" }],
        },
      };
    });
    const client = new ShippoClient({ apiKey: "key", fetch });

    const items: Address[] = [];
    for await (const item of paginate<Address>(client, "/addresses", { results: 2 })) {
      items.push(item);
    }

    expect(items).toEqual([{ object_id: "a" }, { object_id: "b" }, { object_id: "c" }]);
    expect(calls.length).toBe(2);
    expect(calls[1]?.url).toBe("https://api.goshippo.com/addresses?page=2");
  });

  test("makes a single request when there's only one page", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { count: 1, next: null, previous: null, results: [{ object_id: "only" }] },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const items: Address[] = [];
    for await (const item of paginate<Address>(client, "/addresses")) {
      items.push(item);
    }

    expect(items).toEqual([{ object_id: "only" }]);
    expect(calls.length).toBe(1);
  });

  test("stops without yielding anything for an empty result set", async () => {
    const { fetch } = createMockFetch(() => ({
      body: { count: 0, next: null, previous: null, results: [] },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch });

    const items: Address[] = [];
    for await (const item of paginate<Address>(client, "/addresses")) {
      items.push(item);
    }

    expect(items).toEqual([]);
  });

  test.each([
    ["omitted next", { count: 0, results: [] }],
    ["empty-string next", { count: 0, next: "", results: [] }],
  ])("stops after one page for %s", async (_name, body) => {
    const { fetch, calls } = createMockFetch(() => ({ body }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    const items: Address[] = [];
    for await (const item of paginate<Address>(client, "/addresses")) {
      items.push(item);
    }

    expect(items).toEqual([]);
    expect(calls.length).toBe(1);
  });

  test.each([
    ["null results", { results: null, next: null }],
    ["missing results", { next: null }],
  ])("treats %s as an empty page", async (_name, body) => {
    const { fetch } = createMockFetch(() => ({ body }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    const items: Address[] = [];
    for await (const item of paginate<Address>(client, "/orders")) {
      items.push(item);
    }

    expect(items).toEqual([]);
  });

  test("throws instead of looping when next repeats the current URL", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { next: "https://api.goshippo.com/addresses?page=2", results: [] },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    const consume = async (): Promise<void> => {
      for await (const _item of paginate<Address>(client, "/addresses")) {
        // drain
      }
    };

    await expect(consume()).rejects.toThrow(/loop detected/);
    expect(calls.length).toBe(2);
  });

  test("throws when two pages point at each other", async () => {
    const { fetch } = createMockFetch((_call, index) => ({
      body: {
        next: `https://api.goshippo.com/addresses?page=${index % 2 === 0 ? 2 : 1}`,
        results: [],
      },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    const consume = async (): Promise<void> => {
      for await (const _item of paginate<Address>(client, "/addresses?page=1")) {
        // drain
      }
    };

    await expect(consume()).rejects.toBeInstanceOf(ShippoError);
  });

  test("refuses a next URL on a different origin without sending the token", async () => {
    const { fetch, calls } = createMockFetch(() => ({
      body: { next: "https://evil.example/steal", results: [{ object_id: "a" }] },
    }));
    const client = new ShippoClient({ apiKey: "key", fetch, maxRetries: 0 });

    const consume = async (): Promise<void> => {
      for await (const _item of paginate<Address>(client, "/addresses")) {
        // drain
      }
    };

    await expect(consume()).rejects.toBeInstanceOf(ShippoError);
    expect(calls.length).toBe(1);
  });
});
