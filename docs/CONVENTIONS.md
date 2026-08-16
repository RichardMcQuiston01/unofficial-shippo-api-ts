# Conventions for resource modules

Internal contributor doc for Stage 2/3 of `ROADMAP.md`: one resource (or resource group) per
unit of work, built in parallel. This is the shared contract so independently-built modules
don't diverge. Not user-facing — see `README.md` for that.

## File layout

- One file per resource: `src/resources/<resource>.ts` — kebab-free, lowercase, matching the
  resource's plural name (e.g. `src/resources/addresses.ts`, `src/resources/rates.ts`).
- Colocate the test: `src/resources/<resource>.test.ts` next to it, same as `src/client.ts` /
  `src/client.test.ts` from Stage 1.
- A resource **group** (Stage 3's Groups A–D) may span multiple files, one per resource, even
  when a single agent builds the whole group — don't merge unrelated resources into one file.

## Resource class shape

Each resource is a class taking the transport in its constructor, matching the pattern
established in `src/client.ts`:

```ts
import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";

export interface Address {
  object_id: string;
  name: string;
  street1: string;
  // ...wire field names verbatim, see "Field naming" below
}

export interface AddressCreateRequest {
  name: string;
  street1: string;
  // ...request-only fields; omit server-assigned ones like object_id
}

export class AddressesResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new address. */
  async create(request: AddressCreateRequest): Promise<Address> {
    return this.client.request<Address>("POST", "/addresses", { body: request });
  }

  /** Retrieves a single page of addresses. Use `paginate()` to iterate all of them. */
  async list(query?: ListQuery): Promise<PaginatedList<Address>> {
    return this.client.request<PaginatedList<Address>>("GET", "/addresses", { query });
  }

  /** Retrieves a single address by ID. */
  async get(addressId: string): Promise<Address> {
    return this.client.request<Address>("GET", `/addresses/${addressId}`);
  }
}
```

Use the shared `ListQuery` type (`src/pagination.ts`) for every `list()` method's query
parameter rather than a bespoke per-resource type — it already has the index signature needed
to satisfy `RequestOptions["query"]` structurally, which a plain `{ page?: number; results?:
number }` interface doesn't (TypeScript won't structurally match an interface without an index
signature against `Record<string, ...>` under this project's strictness settings).

Wire it into `Shippo` in `src/index.ts`:

```ts
export class Shippo {
  readonly client: ShippoClient;
  readonly addresses: AddressesResource;

  constructor(options: ShippoClientOptions) {
    this.client = new ShippoClient(options);
    this.addresses = new AddressesResource(this.client);
  }
}
```

Also re-export the resource class and its request/response types as named exports from
`src/index.ts` (tree-shakeable, matches the "small predictable surface" goal in `ROADMAP.md`
§1) — e.g. `export { AddressesResource } from "./resources/addresses";`.

## Naming

- Resource property on `Shippo` is **plural**, matching the endpoint and the official SDKs:
  `shippo.addresses`, `shippo.transactions`, `shippo.trackingStatus` (camelCase for
  multi-word resources — `TrackingStatus`, `CarrierAccounts`, etc.).
- Methods are camelCase, matching the exact names in `ROADMAP.md`'s Stage 2/3 tables:
  `list`, `create`, `get`, `validate`, `listForShipment`, `listForShipmentByCurrency`, etc. —
  don't invent alternate names even if you'd phrase it differently.
- Request/response type names: `<Resource><Verb>Request` for request bodies (e.g.
  `AddressCreateRequest`), and the bare singular resource name for the response object (e.g.
  `Address`, not `AddressResponse`).

## Field naming — keep the wire shape

Type fields exactly as Shippo's API returns them (snake_case: `object_id`, `street1`,
`tracking_number`, ...). Do **not** camelCase-transform fields — there's no
serialization/deserialization layer converting between conventions, so the TypeScript type
must match what's actually on the wire. This matches the field names already confirmed in
`ROADMAP.md` §2 (e.g. the pagination envelope's `count`/`next`/`previous`/`results`).

## Pagination

`list()` returns a single `PaginatedList<T>` page — the raw shape (`count`, `next`, `previous`,
`results`) — not an auto-paginating iterator. If a resource benefits from "give me everything,"
that's what the Stage 1 `paginate()` helper (`src/pagination.ts`) is for; call it directly
rather than reimplementing pagination inside the resource class.

## Errors

Let errors from `client.request()` propagate — `ShippoApiError` (non-2xx response) and
`ShippoNetworkError` (no response at all) already carry everything a caller needs (see
`src/errors.ts`). Don't catch and rewrap them in resource methods.

## Doc comments

Every public method needs a one-line JSDoc comment (Stage 2/3 exit criteria requires this).
State what it does, not the obvious restatement of its name — e.g. prefer "Validates an
address and returns the validation results" over "Validates an address."

## Tests

One test file per resource, using `src/testing/mock-fetch.ts`'s `createMockFetch()` (see
`src/client.test.ts` / `src/pagination.test.ts` for the pattern). Per Stage 2/3 exit criteria,
cover at minimum:

- One success-path test per method.
- At least one error-path test per resource (a non-2xx response mapping to `ShippoApiError`)
  — doesn't need to be per-method if the mapping is generic, but the resource needs at least
  one.

## Spec cross-checking

For the 9 resources with real OpenAPI coverage via the `api-evangelist/shippo` mirror
(`ROADMAP.md` §2: Addresses, Carrier Accounts, Parcels, Rates, Shipments, Tracking,
Transactions, Refunds, Webhooks), cross-check field names and required/optional-ness against
those specs rather than guessing from SDK READMEs alone. For the other 9 (Batches, Customs
Declarations/Items, Manifests, Orders, Pickups, Service Groups, User/Carrier Parcel Templates,
Rates at Checkout), no OpenAPI spec was reachable while building this package — types are a
best effort from SDK method signatures, and should be flagged for follow-up verification in
the PR description rather than presented as confirmed.
