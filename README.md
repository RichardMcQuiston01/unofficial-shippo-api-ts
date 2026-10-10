# @richardmcquiston01/shippo-api

[![CI](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/actions/workflows/ci.yml)

## Overview

Framework agnostic TypeScript NPM package for interacting with Shippo's API service.

This is an **unofficial**, independently maintained client — not published or endorsed by
Shippo. It targets individuals and businesses building an app to manage their own shipping
(a store's checkout flow, an internal fulfillment tool), not a platform reselling shipping on
behalf of other businesses. See [`ROADMAP.md`](./ROADMAP.md) for the full delivery plan,
architecture decisions, and scope.

**Status: `1.0.0`.** All 19 in-scope resources are built and have been through a full
integration/consistency pass — everything from validating an address through buying a label to
managing webhooks, batches, customs, and carrier accounts uses the same naming and error
conventions throughout. (`Shippo Accounts` and the Platform API are permanently out of scope —
see `ROADMAP.md`'s Target User section.) The live-contract suite has run against a real
Shippo test-mode account and every discrepancy it surfaced has been fixed — see the field-level
notes below and `ROADMAP.md`'s Stage 5 section for specifics.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.x — the primary development runtime, package manager, and test
  runner for this project.
- Node.js 22+ if you're consuming the published package from a Node.js app rather than Bun
  (the build output targets both).

### Installation

```bash
bun add @richardmcquiston01/shippo-api
# or
npm install @richardmcquiston01/shippo-api
```

### Authentication

Get an API key from your Shippo account's API settings (see
[Shippo's docs](https://docs.goshippo.com/) if you don't have an account yet) — use a
**test-mode** key (starts with `shippo_test_`) while developing; switch to a live key only
when you're ready to buy real labels. Pass it to the `Shippo` constructor:

```ts
const shippo = new Shippo({ apiKey: "shippo_test_..." });
```

It's sent as `Authorization: ShippoToken <apiKey>` on every request. The key itself is a true
private field inside the client — it never shows up via `JSON.stringify(shippo)` or
`console.log(shippo)`, so accidentally logging the client object won't leak it. Keep the key
out of source control regardless (an environment variable, e.g. `process.env.SHIPPO_API_KEY`,
is the usual approach) — this package doesn't read any environment variable for you, so how
you supply the key is up to you.

An optional `apiVersion` (a dated string like `2018-02-08`) pins the Shippo API version you're
built against, instead of drifting with your account's default:

```ts
const shippo = new Shippo({ apiKey: "shippo_test_...", apiVersion: "2018-02-08" });
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

### Error handling

Every method throws one of three typed errors — `catch` and narrow with `instanceof`:

```ts
import { Shippo, ShippoApiError, ShippoNetworkError } from "@richardmcquiston01/shippo-api";

try {
  await shippo.addresses.create({
    name: "",
    street1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
} catch (error) {
  if (error instanceof ShippoApiError) {
    // Shippo responded with a non-2xx status.
    console.error(error.status, error.body, error.message);
  } else if (error instanceof ShippoNetworkError) {
    // The request never got a response — timeout, DNS failure, etc.
    console.error(error.message);
  } else {
    throw error; // something else entirely
  }
}
```

`ShippoApiError` carries `status`, `body` (the raw response body — typed `unknown`, since
Shippo's error body shape isn't confirmed by any reachable spec; see `ROADMAP.md` §2),
`requestId` (from an `x-request-id` response header, if present), and `retryAfterMs` (parsed
from a `Retry-After` header on 429s, if present). `.message` does best-effort extraction from
`body` for a readable string, but `body` itself is what to inspect for anything precise.

Retries are automatic but deliberately conservative (see `ShippoClientOptions`):

- `GET`, `PUT`, and `DELETE` are retried with exponential backoff on network errors, timeouts,
  and 429/5xx responses, honoring `Retry-After` (capped at 60 seconds).
- `POST` and `PATCH` (including `transactions.create` and `batches.purchase`, which buy labels)
  are **only retried on 429**. A timeout or 5xx can arrive after Shippo already acted, and Shippo
  documents no idempotency key, so a retry could buy a second label. If you've confirmed your
  usage is safe, opt in with `retryNonIdempotent: true`.
- Aborting the `signal` you pass to a request fails it immediately, including mid-backoff.
- Set `maxRetries: 0` to disable retries entirely. `maxRetries`, `retryDelayMs`, and `timeoutMs`
  are validated in the constructor.

### Examples

Runnable scripts in [`examples/`](./examples): validating an address, the core
shipment-to-purchased-label flow, tracking a shipment, and receiving an inbound webhook (plain
Node `http`, and Express). See [`examples/README.md`](./examples/README.md) for how to run them.

### Webhook security

`parseEvent()` only parses; it does not authenticate the sender. Shippo documents three
controls ([webhook security](https://docs.goshippo.com/tracking/webhook-security)):

- **URL token** — a self-generated secret you append to the webhook URL (`?token=...`).
  Available to every account. Check it with `verifyWebhookToken(received, expected)`
  (constant-time).
- **HMAC signature** — the `Shippo-Auth-Signature` header (`t=<unix>,v1=<hex>`). Not
  self-serve: Shippo enables it and shares the secret. Check it with
  `verifyWebhookSignature({ rawBody, header, secret })`, which uses a constant-time compare,
  rejects timestamps more than 5 minutes off (`toleranceSec`), and returns
  `{ ok: false, reason }` instead of throwing. It needs the **raw** body bytes.
- **IP allowlist** — Shippo's published US/EU ranges, enforced at your firewall or proxy.
  Optional extra layer, not a substitute for the token or HMAC.

Verify first, parse second, and acknowledge with a 2xx right away (Shippo retries after ~3
seconds) before doing any API calls:

```ts
import { parseEvent, verifyWebhookSignature } from "@richardmcquiston01/shippo-api";

const verdict = verifyWebhookSignature({
  rawBody, // exact request bytes, e.g. from express.text()
  header: req.get("shippo-auth-signature"),
  secret: process.env.SHIPPO_WEBHOOK_SECRET!,
});
if (!verdict.ok) {
  return res.sendStatus(401); // verdict.reason says why
}
const event = parseEvent(rawBody); // throws ShippoError on a malformed payload
```

### Reference

Generated per-resource API reference (every class, method, and type, with the same doc
comments as the source) lives in [`docs/reference/`](./docs/reference/README.md).

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

`bun test` runs entirely against a mocked API — deterministic, no credentials needed. A
separate live contract suite (`bun run test:live`) exists to spot-check assumptions against
the real Shippo test-mode API; it's skipped by default and requires your own test-mode API
key — see [`CONTRIBUTING.md`](./CONTRIBUTING.md)'s "Live contract tests" section.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the branch/PR workflow.

## Buy Me a Coffee

If this app, code, or repository has helped you or someone you know, please consider donating.
I appreciate any help to offset the costs of development and/or AI Credits.

[**Donate via Stripe**](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800), or scan:

[![Donate via Stripe](./donate.svg)](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800)

## License

Apache 2

## Copyright

(c)2026 Richard McQuiston. All rights reserved.
