# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: pre-alpha.** No resource clients exist yet — only project scaffolding (Stage 0 of
the roadmap). Not yet published to npm.

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

Not yet available — see [`ROADMAP.md`](./ROADMAP.md) for the planned API shape
(`new Shippo({ apiKey })` plus per-resource methods).

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

## License

Apache 2

## Copyright

(c)2026 Richard McQuiston. All rights reserved.
