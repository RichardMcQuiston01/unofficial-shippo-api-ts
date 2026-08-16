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

No public API surface yet — nothing in this release is meant for consumption.
