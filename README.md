# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: pre-alpha.** The core HTTP client and six core resources (Addresses, Parcels,
Shipments, Rates, Transactions, Tracking) are built — enough to validate an address, create a
shipment, and buy a label. Extended resources (Webhooks, Batches, Customs, Orders, and more)
land in Stage 3 of the roadmap. Not yet published to npm.

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
`shippo.transactions`, `shippo.tracking`. Anything else (Webhooks, Batches, Customs, Orders,
...) isn't wrapped yet — see [`ROADMAP.md`](./ROADMAP.md) — but is still reachable directly:

```ts
const result = await shippo.client.request("GET", "/some/not-yet-wrapped/endpoint");
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
