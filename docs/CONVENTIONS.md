# Conventions for resource modules

Internal contributor doc, originally written for Stage 2/3 of `ROADMAP.md` (one resource or
resource group per unit of work, built in parallel) and still the binding contract for any
future resource work (e.g. if `Shippo Accounts` ever comes into scope). This is the shared
contract so independently-built modules don't diverge. Not user-facing — see `README.md` for
that. Stage 3 (all 19 resources) shipped following this doc, built by four parallel subagents
in isolated git worktrees, one per Stage 3 group — the patterns below held up across all of
them without needing a mid-stage revision.

## File layout

- One file per resource: `src/resources/<resource>.ts`, lowercase, matching the resource's
  plural name — single-word resources are one word (`addresses.ts`, `rates.ts`); multi-word
  resources are kebab-case (`carrier-accounts.ts`, `rates-at-checkout.ts`,
  `user-parcel-templates.ts`). Don't run multi-word names together unseparated.
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

## Honest-uncertainty comment pattern

Most of Stage 3 had no reachable OpenAPI spec to build against (see "Spec cross-checking"
below) — this is the pattern every Stage 3 resource used to handle that, and it's the
pattern any future unconfirmed-field work should follow too:

- A field whose _existence_ is reasonably certain but whose _shape_ isn't: type it loosely
  (`Record<string, unknown>`, or a minimal type with extra keys allowed) with a doc comment
  explaining what's confirmed (usually just the field name, from an AsyncAPI/SDK source) and
  what isn't. See `TrackingLocation` (`./tracking.ts`), `BatchShipment`/`BatchObjectResult`
  (`./batches.ts`).
- A field you're inferring by analogy with a confirmed field elsewhere in the codebase (e.g.
  reusing the `WAITING|QUEUED|SUCCESS|ERROR` status-enum pattern seen on `Shipment`/
  `Transaction` for a resource where that enum isn't independently confirmed): say so
  explicitly — "inferred by analogy," not "confirmed." See `ManifestStatus`, `BatchStatus`.
- A whole resource with no spec coverage at all: put the caveat at the top of the file, once,
  rather than repeating it on every field — see `orders.ts`'s file-level comment for the
  template. Keep the type conservative (core fields only) over fabricating a large schema —
  a smaller, honestly-scoped type is more useful than a big guessed one.
- Never let an unconfirmed guess read as confirmed. This matters more than getting the guess
  right — a consumer who trusts a fabricated-but-confident-looking field is worse off than one
  who sees a `Record<string, unknown>` and knows to check.

## Two concerns, one file

Some resources genuinely bundle two distinct capabilities behind one endpoint family — say so
explicitly in the file's top comment rather than letting it read as one thing. Established
examples: `webhooks.ts` (subscription CRUD _and_ `parseEvent()` for inbound deliveries —
different enough that `parseEvent()` isn't even a class method, it's a standalone function);
`rates-at-checkout.ts` (live rate computation _and_ default-parcel-template singleton config,
which share the `/rates_at_checkout` path prefix but aren't the same concern).

## Spec cross-checking

For the 9 resources with real OpenAPI coverage via the `api-evangelist/shippo` mirror
(`ROADMAP.md` §2: Addresses, Carrier Accounts, Parcels, Rates, Shipments, Tracking,
Transactions, Refunds, Webhooks), cross-check field names and required/optional-ness against
those specs rather than guessing from SDK READMEs alone. For the other 9 (Batches, Customs
Declarations/Items, Manifests, Orders, Pickups, Service Groups, User/Carrier Parcel Templates,
Rates at Checkout), no OpenAPI spec was reachable while building this package — types are a
best effort from SDK method signatures, flagged inline per the honest-uncertainty pattern
above rather than presented as confirmed. Revisit these nine if a live API key or spec access
ever becomes available (see `ROADMAP.md`'s Stage 5 note on this).
