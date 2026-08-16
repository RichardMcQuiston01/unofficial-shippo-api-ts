# CHANGELOG

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project will adhere to [Semantic Versioning](https://semver.org/)
once it publishes its first release (see `ROADMAP.md`).

## [Unreleased]

### Added

- Project scaffolding (Stage 0 of `ROADMAP.md`): TypeScript strict config, Bun-based build
  (`bun build` for dual ESM/CJS output, `tsc --emitDeclarationOnly` for `.d.ts`), `bun:test`
  test runner, ESLint (flat config) + Prettier, `.gitignore`, and a `package.json` `exports`
  map for dual ESM/CJS consumption.
- CI: GitHub Actions workflow running the Bun toolchain (lint, typecheck, test, build) plus a
  Node.js 22/24 matrix job that smoke-tests the built package under plain Node.
- `CONTRIBUTING.md` and issue/PR templates.
- A trivial placeholder `Shippo` client class (`src/index.ts`) establishing the package's
  entry-point shape ahead of Stage 1's real HTTP client.
- Buy Me a Coffee section in `README.md`.
- Core HTTP client (Stage 1 of `ROADMAP.md`): `ShippoClient` transport with `ShippoToken` auth
  header injection, optional `shippo-api-version` header, JSON (de)serialization, per-request
  timeout, and exponential-backoff retries (honoring `Retry-After` when present) for network
  errors and 429/5xx responses.
- Typed error hierarchy (`src/errors.ts`): `ShippoError` (base), `ShippoApiError` (non-2xx
  responses — `status`, `body`, `requestId`, `retryAfterMs`), and `ShippoNetworkError`
  (request never got a response).
- `paginate()` async-generator helper (`src/pagination.ts`) for iterating every item across a
  list endpoint's pages.
- `Shippo` now exposes `shippo.client` as a public escape hatch for calling any endpoint
  directly ahead of Stage 2/3 wrapping it in typed resource methods.
- `docs/CONVENTIONS.md`: the internal contract for Stage 2/3's parallel resource-module work
  (file layout, naming, error/pagination handling, test expectations).
- Six core resource modules (Stage 2 of `ROADMAP.md`), each with types matching the wire
  format (snake_case, no camelCase transformation layer) and full unit test coverage:
  - `shippo.addresses` — `create`, `list`, `get`, `validate`.
  - `shippo.parcels` — `create`, `list`, `get`.
  - `shippo.shipments` — `create`, `list`, `get`.
  - `shippo.rates` — `get`, `listForShipment`, `listForShipmentByCurrency`.
  - `shippo.transactions` — `create`, `list`, `get` (label purchase).
  - `shippo.tracking` — `create`, `get`.
- Shared `ListQuery` type (`src/pagination.ts`) for every resource's `list()` query params.

No extended resources (Webhooks, Batches, Customs, Orders, Pickups, Carrier Accounts, etc.)
yet — those land in Stage 3. Nothing here is a stable, documented public API yet.
