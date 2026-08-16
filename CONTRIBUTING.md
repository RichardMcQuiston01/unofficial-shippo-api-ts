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
