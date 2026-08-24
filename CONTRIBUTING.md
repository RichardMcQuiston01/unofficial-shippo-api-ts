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
| `bun run changeset`    | Records a version-bump intent for your change — see "Releases"      |
| `bun run docs`         | Regenerates `docs/reference/` from source JSDoc via TypeDoc         |

Run `bun run ci` before opening a PR — it's the same thing CI checks.

## Branch and PR workflow

- `main` is the stable/release branch; `dev` is the active integration branch.
- Work happens on feature branches cut from `dev` (e.g. `feature/<short-description>`), merged
  back into `dev` via pull request.
- Keep `README.md` and `CHANGELOG.md` up to date as part of the same PR when a change affects
  what a user or contributor would see there — not as a follow-up.
- PRs should pass `bun run ci` locally before review; the same checks run in GitHub Actions
  (Bun toolchain, plus a Node.js 22/24 consumer smoke test).

## Releases

Versioning and publishing to npm are handled by [Changesets](https://github.com/changesets/changesets),
not by hand-editing `package.json`'s `version` field or `CHANGELOG.md` directly.

**If your PR is a user-facing change** (anything that would belong in `CHANGELOG.md` — a new
feature, a bug fix, a breaking change), add a changeset before merging:

```bash
bun run changeset
```

This prompts for a bump type (patch/minor/major — see the semver policy below) and a one-line
summary, then writes a markdown file under `.changeset/`. Commit that file as part of your PR.
Internal-only changes (docs, tests, CI config) don't need one.

**Cutting a release** (maintainers): merge `dev` into `main` when the accumulated changesets on
`dev` are ready to ship. Pushing to `main` runs `.github/workflows/release.yml`, which either:

- opens/updates a "Version Packages" PR that bundles all pending changesets into a version bump
  and a `CHANGELOG.md` entry (via `changeset version`), or
- if that PR was just merged, publishes the new version to npm with
  [provenance](https://docs.npmjs.com/generating-provenance-statements) attached
  (via `changeset publish`), and pushes the corresponding git tag.

Publishing requires an `NPM_TOKEN` repository secret (an npm automation token with publish
rights on the `@richardmcquiston01` scope) — set once by whoever administers the npm account,
not something contributors need for day-to-day work.

**After a release, merge `main` back into `dev`.** `changeset version`'s commit (the version
bump in `package.json` and the new `CHANGELOG.md` section) lands on `main`, not `dev` — if
nobody merges it back, `dev` stays permanently behind on the real version number and
changelog, and every subsequent PR branched from `dev` inherits the stale `package.json`
version. (This bit the `0.1.0` release itself: `SDK_VERSION` was correct in the published
package but `dev` kept reporting `0.0.0` until the back-merge happened.) There's no
automation for this yet — do it manually as the last step of cutting a release.

**One-time note for the 0.1.0 release specifically**: `CHANGELOG.md` up to this point was
hand-written directly under an `## [Unreleased]` heading (Keep a Changelog style), not built
from individual changesets. The first `changeset version` run will insert its own `## 0.1.0`
section above that, sourced only from `.changeset/initial-release.md`'s summary — it won't
fold the existing `[Unreleased]` content into it automatically. Reconcile that by hand in the
"Version Packages" PR before merging it (fold `[Unreleased]`'s content into the new `## 0.1.0`
section, or drop the auto-generated one and rename `[Unreleased]` to `## 0.1.0` yourself) so
the published changelog reads as one coherent entry. Every release after the first won't have
this problem, since by then `[Unreleased]` will be empty and changesets will own the section
it creates from scratch.

### Semver policy

While the package is pre-1.0 (`0.x.y`), treat changeset bump types as: **patch** for bug fixes
and internal improvements with no API change, **minor** for new features and for breaking
changes alike (standard semver behavior below `1.0.0` — every `0.x` bump is allowed to break
callers, but we still use "minor" to signal "bigger than a patch" rather than reaching for a
`major` bump that doesn't mean anything yet at `0.x`). **Major** stays unused until `1.0.0`.

`1.0.0` is warranted once the package has real-world usage signal beyond its own exit
criteria — i.e. not simply "all planned resources and tests exist" (that bar was already met
going into this stage), but "the types have held up against genuine Shippo API responses,
including from a live account, without a breaking correction being needed." Concretely: once
the live-contract suite (`bun run test:live`, see below) has actually been run against a real
account and any discrepancies it surfaces have been fixed — not just built and left unrun.
Revisit this policy in `ROADMAP.md` once that happens.

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
