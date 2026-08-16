# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: pre-alpha.** All 19 in-scope resources are built — everything from validating an
address through buying a label to managing webhooks, batches, customs, and carrier accounts.
(`Shippo Accounts` and the Platform API are permanently out of scope — see `ROADMAP.md`'s
Target User section.) Not yet published to npm, and not yet hardened for production use — see
the field-level caveats below before relying on the newer resources.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.x — the primary development runtime, package manager, and test
  runner for this project.
- Node.js 22+ if you're consuming the published package from a Node.js app rather than Bun
  (the build output targets both).

### Installation

Not yet published. Once an initial version ships:

```bash
bun add @richardmcquiston01/shippo-api
# or
npm install @richardmcquiston01/shippo-api
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

### Examples

Planned for Stage 6 of the roadmap; none exist yet.

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
