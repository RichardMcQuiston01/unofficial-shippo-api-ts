# Contributing

Thanks for your interest in this project. It's early — see [`ROADMAP.md`](./ROADMAP.md) for
the current stage and what's planned next.

## Prerequisites

- [Bun](https://bun.sh) 1.x — the project's package manager, build tool, and test runner.
- Node.js 22+ if you want to verify the built package under Node as well as Bun.

## Setup

```bash
git clone https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts.git
cd unofficial-shippo-api-ts
bun install
```

## Scripts

| Command                | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `bun run build`        | Bundles `dist/index.{js,cjs}` and emits `dist/index.d.ts`           |
| `bun test`             | Runs the test suite (`bun:test`)                                    |
| `bun run test:live`    | Runs the live contract suite — see "Live contract tests" below      |
| `bun run lint`         | Lints with ESLint                                                   |
| `bun run lint:fix`     | Lints and auto-fixes what it can                                    |
| `bun run format`       | Formats the repo with Prettier                                      |
| `bun run format:check` | Checks formatting without writing changes                           |
| `bun run typecheck`    | Type-checks with `tsc --noEmit` (no build output)                   |
| `bun run ci`           | Runs everything CI runs: format check, lint, typecheck, test, build |

Run `bun run ci` before opening a PR — it's the same thing CI checks.

## Branch and PR workflow

- `main` is the stable/release branch; `dev` is the active integration branch.
- Work happens on feature branches cut from `dev` (e.g. `feature/<short-description>`), merged
  back into `dev` via pull request.
- Keep `README.md` and `CHANGELOG.md` up to date as part of the same PR when a change affects
  what a user or contributor would see there — not as a follow-up.
- PRs should pass `bun run ci` locally before review; the same checks run in GitHub Actions
  (Bun toolchain, plus a Node.js 22/24 consumer smoke test).

## Code style

Enforced by ESLint + Prettier in CI, not by convention — run `bun run format` and
`bun run lint:fix` before committing if you're not running them via an editor integration.

## Live contract tests

Everything in `bun test` normally runs against a mocked `fetch` (`src/testing/mock-fetch.ts`)
— fast and deterministic, but it can only confirm the code does what we _assumed_ the API
does, not that the assumption itself is correct. `src/live-contract.test.ts` hits the real
Shippo test-mode API instead, to spot-check the things flagged as unconfirmed throughout
`ROADMAP.md` (the error response body shape, and field-level types for resources with no
reachable OpenAPI spec).

**It's skipped entirely — not run, not failed, just skipped — unless `SHIPPO_TEST_API_KEY` is
set.** Never runs in CI; there's no key configured there by design.

To run it locally:

```bash
SHIPPO_TEST_API_KEY=shippo_test_... bun run test:live
```

Use a **test-mode** key only (starts with `shippo_test_`, from your own Shippo account's API
settings) — never a live/production key. The suite creates and, where reversible, deletes real
objects in your test-mode account (addresses, parcels, shipments, a purchased test-mode label,
a customs item, a user parcel template, a webhook it registers and then removes). It logs the
real response shapes it observes (`console.log`) so you can compare them against this
package's types by eye — it's a spot-check tool, not a fully automated shape-diff.

**Known gaps**, intentionally not covered (see the comment at the bottom of the file for the
full list): Batches and Pickups need a real connected carrier account most test accounts won't
have; Carrier Accounts' three OAuth2-adjacent methods need an interactive redirect flow that
can't be automated; Customs Declarations and Rates at Checkout aren't exercised yet. Expanding
this file to cover more of that is a welcome follow-up — treat what's here as the template,
not the finished suite.

Never commit a real API key. If you paste one into a chat/terminal for a session, treat it as
compromised afterward and rotate it in the Shippo dashboard once you're done — cheap insurance
even for a test-mode key.
