# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: `0.1.0`, pre-1.0.** All 19 in-scope resources are built and have been through a full
integration/consistency pass — everything from validating an address through buying a label to
managing webhooks, batches, customs, and carrier accounts uses the same naming and error
conventions throughout. (`Shippo Accounts` and the Platform API are permanently out of scope —
see `ROADMAP.md`'s Target User section.) Published to npm, but not yet hardened for production
use — see the field-level caveats below before relying on the newer resources, and
`CONTRIBUTING.md`'s "Releases" section for what `1.0.0` is gated on.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.x — the primary development runtime, package manager, and test
  runner for this project.
- Node.js 22+ if you're consuming the published package from a Node.js app rather than Bun
  (the build output targets both).

### Installation

```bash
bun add @richardmcquiston01/shippo-api
# or
npm install @richardmcquiston01/shippo-api
```

### Authentication

Get an API key from your Shippo account's API settings (see
[Shippo's docs](https://docs.goshippo.com/) if you don't have an account yet) — use a
**test-mode** key (starts with `shippo_test_`) while developing; switch to a live key only
when you're ready to buy real labels. Pass it to the `Shippo` constructor:

```ts
const shippo = new Shippo({ apiKey: "shippo_test_..." });
```

It's sent as `Authorization: ShippoToken <apiKey>` on every request. The key itself is a true
private field inside the client — it never shows up via `JSON.stringify(shippo)` or
`console.log(shippo)`, so accidentally logging the client object won't leak it. Keep the key
out of source control regardless (an environment variable, e.g. `process.env.SHIPPO_API_KEY`,
is the usual approach) — this package doesn't read any environment variable for you, so how
you supply the key is up to you.

An optional `apiVersion` (a dated string like `2018-02-08`) pins the Shippo API version you're
built against, instead of drifting with your account's default:

```ts
const shippo = new Shippo({ apiKey: "shippo_test_...", apiVersion: "2018-02-08" });
```

### Usage

```ts
import { Shippo } from "@richardmcquiston01/shippo-api";

const shippo = new Shippo({ apiKey: "shippo_test_..." });

// Create a shipment from two addresses and a parcel, computing rates.
const shipment = await shippo.shipments.create({
  address_from: {
    name: "Ada Lovelace",
    street1: "123 Main St",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "US",
  },
  address_to: {
    name: "Alan Turing",
    street1: "456 Market St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "US",
  },
  parcels: [
    { length: "10", width: "8", height: "4", distance_unit: "in", weight: "2", mass_unit: "lb" },
  ],
});

// Buy a label for the cheapest rate.
const [cheapest] = shipment.rates?.sort((a, b) => Number(a.amount) - Number(b.amount)) ?? [];
if (cheapest) {
  const transaction = await shippo.transactions.create({
    rate: cheapest.object_id,
    label_file_type: "PDF",
  });
  console.log(transaction.label_url);
}
```

Available today: `shippo.addresses`, `shippo.parcels`, `shippo.shipments`, `shippo.rates`,
`shippo.transactions`, `shippo.tracking`, `shippo.webhooks` (+ `parseEvent()` for inbound
webhook deliveries), `shippo.batches`, `shippo.refunds`, `shippo.customsDeclarations`,
`shippo.customsItems`, `shippo.manifests`, `shippo.orders`, `shippo.carrierAccounts`,
`shippo.carrierParcelTemplates`, `shippo.userParcelTemplates`, `shippo.serviceGroups`,
`shippo.pickups`, `shippo.ratesAtCheckout`.

**Field-level accuracy varies by resource.** The first six above (plus Carrier Accounts,
Refunds, and Webhooks' subscription CRUD) were built against Shippo's actual OpenAPI schemas.
The rest — Batches, Customs Declarations/Items, Manifests, Orders, Carrier/User Parcel
Templates, Service Groups, Pickups, and Rates at Checkout — have no reachable spec (see
`ROADMAP.md` §2) and are typed from official-SDK method signatures plus domain conventions;
every field with a real uncertainty is flagged with a doc comment in the source (e.g.
`Order`'s fields, `Batch`'s `batch_shipments`, Carrier Accounts' OAuth2 methods). Read those
comments before depending on a field in production.

Nothing outside this resource set (i.e. the Platform API) is reachable through this client at
all — see `ROADMAP.md`'s Target User section for why. For anything else genuinely missing,
the transport is still available directly:

```ts
const result = await shippo.client.request("GET", "/some/endpoint");
```

### Error handling

Every method throws one of three typed errors — `catch` and narrow with `instanceof`:

```ts
import { Shippo, ShippoApiError, ShippoNetworkError } from "@richardmcquiston01/shippo-api";

try {
  await shippo.addresses.create({
    name: "",
    street1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
} catch (error) {
  if (error instanceof ShippoApiError) {
    // Shippo responded with a non-2xx status.
    console.error(error.status, error.body, error.message);
  } else if (error instanceof ShippoNetworkError) {
    // The request never got a response — timeout, DNS failure, etc.
    console.error(error.message);
  } else {
    throw error; // something else entirely
  }
}
```

`ShippoApiError` carries `status`, `body` (the raw response body — typed `unknown`, since
Shippo's error body shape isn't confirmed by any reachable spec; see `ROADMAP.md` §2),
`requestId` (from an `x-request-id` response header, if present), and `retryAfterMs` (parsed
from a `Retry-After` header on 429s, if present). `.message` does best-effort extraction from
`body` for a readable string, but `body` itself is what to inspect for anything precise.

You don't need to handle retries yourself: network errors and 429/5xx responses are retried
automatically with exponential backoff (honoring `Retry-After` when present) before either
error type reaches your code — see `ShippoClientOptions.maxRetries`/`retryDelayMs` to tune
this, or set `maxRetries: 0` to disable it.

### Examples

Runnable scripts in [`examples/`](./examples): validating an address, the core
shipment-to-purchased-label flow, tracking a shipment, and receiving + parsing an inbound
webhook (plain Node `http`, and Express) — including the re-fetch-by-`object_id` mitigation
for the lack of webhook signature verification. See
[`examples/README.md`](./examples/README.md) for how to run them.

### Reference

Generated per-resource API reference (every class, method, and type, with the same doc
comments as the source) lives in [`docs/reference/`](./docs/reference/README.md).

## Development

```bash
bun install
bun run build      # bundle dist/index.{js,cjs} + emit dist/index.d.ts
bun test           # run the test suite
bun run lint       # eslint
bun run typecheck  # tsc --noEmit, no build output
bun run format     # prettier --write
bun run ci         # format:check + lint + typecheck + test + build, same as CI
```

`bun test` runs entirely against a mocked API — deterministic, no credentials needed. A
separate live contract suite (`bun run test:live`) exists to spot-check assumptions against
the real Shippo test-mode API; it's skipped by default and requires your own test-mode API
key — see [`CONTRIBUTING.md`](./CONTRIBUTING.md)'s "Live contract tests" section.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the branch/PR workflow.

## Buy Me a Coffee

I developed this while I currently looking for work. If this app has helped you or someone you
know, please consider donating. I appreciate it.

[**Donate via Stripe**](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800), or scan:

[![Donate via Stripe](./donate.svg)](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800)

## License

Apache 2

## Copyright

(c)2026 Richard McQuiston. All rights reserved.
