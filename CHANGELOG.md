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
- Thirteen extended resource modules (Stage 3 of `ROADMAP.md`), completing the resource set:
  - `shippo.webhooks` — subscription CRUD (`list`/`create`/`get`/`update`/`delete`) **and**
    `parseEvent()`, a framework-agnostic parser/type-narrower for inbound webhook deliveries
    (`transaction_created`/`updated`, `batch_created`/`purchased`, `track_updated`). Documents
    explicitly that it performs no signature verification — Shippo's spec has no such
    mechanism — and recommends re-fetching by `object_id` before trusting sensitive data.
  - `shippo.batches` — `create`, `get`, `addShipments`, `purchase`, `removeShipments`.
  - `shippo.refunds` — `create`, `list`, `get`.
  - `shippo.customsDeclarations`, `shippo.customsItems` — `create`, `list`, `get`.
  - `shippo.manifests` — `create`, `list`, `get`.
  - `shippo.orders` — `create`, `list`, `get`.
  - `shippo.carrierAccounts` — `list`/`create`/`get`/`update` plus `initiateOauth2Signin`,
    `register`, `getRegistrationStatus`.
  - `shippo.carrierParcelTemplates` — `list`, `get`.
  - `shippo.userParcelTemplates` — `list`/`create`/`get`/`update`/`delete`.
  - `shippo.serviceGroups` — `list`/`create`/`update`/`delete`.
  - `shippo.pickups` — `create`.
  - `shippo.ratesAtCheckout` — `create` plus default-parcel-template management
    (`getDefaultParcelTemplate`/`updateDefaultParcelTemplate`/`deleteDefaultParcelTemplate`).
  - Built by four parallel subagents (one per `ROADMAP.md` Stage 3 group, isolated git
    worktrees), reviewed and integrated in one pass. Field-level types for
    Addresses/Parcels/Shipments/Rates/Transactions/Tracking/Carrier Accounts/Refunds/Webhooks
    (subscription CRUD) are grounded in Shippo's OpenAPI mirror; the other nine resources have
    no reachable spec and are typed from official-SDK method signatures plus domain
    conventions, with every uncertain field flagged inline via doc comments rather than
    presented as confirmed — see each file's top-of-file comment and `ROADMAP.md`'s Stage 3
    section for specifics.

`Shippo Accounts` and the Platform API remain permanently out of scope (see `ROADMAP.md`'s
Target User section). All 19 resources exist now, but nothing here is a stable, documented
public API yet — Stage 5 (testing hardening, including a live-key spot-check of the
unconfirmed field shapes) is still ahead.

### Changed

- Integration & consistency pass (Stage 4 of `ROADMAP.md`) across all 19 resources, built by
  three parallel read-only audits (naming/API consistency, test coverage completeness, export
  completeness) followed by a manual fix pass. Test coverage and exports came back clean
  (100% line/function coverage repo-wide, all 19 resources correctly re-exported and wired
  onto `Shippo`); naming turned up three real inconsistencies, now fixed:
  - `carrierParcelTemplates.get()` and `userParcelTemplates.get()/update()/delete()` renamed
    their ID parameter from the generic `templateId` to `carrierParcelTemplateId`/
    `userParcelTemplateId`, matching every other resource's `<resourceSingular>Id` pattern.
    Positional parameter, no caller impact.
  - **Breaking (pre-release) type rename**: `TrackingRegisterRequest` → `TrackingCreateRequest`
    (`tracking.create()`'s request type), matching the `<Resource>CreateRequest` naming every
    other resource follows — the old name's verb ("Register") didn't match the method's actual
    verb ("create").
  - `webhooks.delete()` normalized to `return this.client.request(...)` instead of `await` +
    empty return, matching the other three `Promise<void>`-returning delete methods.
  - `docs/CONVENTIONS.md` gained explicit rules for ID parameter naming and the
    `Promise<void>`-return style, closing the gap that let these drift in the first place.
- Live contract test suite (Stage 5 of `ROADMAP.md`): `src/live-contract.test.ts`, gated
  entirely behind a `SHIPPO_TEST_API_KEY` environment variable (skipped, not failed, when
  unset — never runs in CI). Where the rest of the suite mocks `fetch`, this hits the real
  Shippo test-mode API to spot-check what Stages 1-3 flagged as unconfirmed: the error
  response body shape, and field-level types for resources with no reachable OpenAPI spec.
  Covers the core create-shipment-buy-a-label-track-it happy path, deliberate 404/400 errors
  to observe real error bodies, `list()` smoke checks across 8 no-spec resources, and
  standalone creates for Customs Items, User Parcel Templates, and Webhooks. Documented in
  `CONTRIBUTING.md`'s new "Live contract tests" section, including its known gaps (Batches,
  Pickups, Carrier Accounts' OAuth2 methods, Customs Declarations, Rates at Checkout aren't
  exercised yet — left as a template to extend). `bun run test:live` added as a shortcut.
  Coverage threshold itself was already met as of Stage 4 (100% line/function, mocked-HTTP).
