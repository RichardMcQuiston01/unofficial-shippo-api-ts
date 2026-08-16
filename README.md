# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: pre-alpha.** The core HTTP client exists (auth, retries, pagination, typed errors),
but no resource methods (`addresses`, `shipments`, etc.) yet — those land in Stage 2/3 of the
roadmap. Not yet published to npm.

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

Resource methods (`shippo.addresses.create()`, etc.) aren't built yet — see
[`ROADMAP.md`](./ROADMAP.md) for the planned shape. Until then, the underlying transport is
usable directly for any endpoint:

```ts
import { Shippo } from "@richardmcquiston01/shippo-api";

const shippo = new Shippo({ apiKey: "shippo_test_..." });

const address = await shippo.client.request("POST", "/addresses", {
  body: {
    name: "Ada Lovelace",
    street1: "123 Main St",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "US",
  },
});
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
