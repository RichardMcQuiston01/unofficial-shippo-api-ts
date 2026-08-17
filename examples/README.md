# Examples

Runnable scripts demonstrating this package's core flows. Each imports from `../src/index`
(the local source) rather than `@richardmcquiston01/shippo-api`, since the package isn't
published to npm yet — every file has a comment at the top noting the one-line swap once it
is.

Run any of them with Bun from the repo root:

```bash
bun install
SHIPPO_TEST_API_KEY=shippo_test_... bun run examples/<file>.ts
```

Get a test-mode key (starts with `shippo_test_`) from your own Shippo account — see
[Shippo's docs](https://docs.goshippo.com/) for how to sign up. Never use a live/production
key against example code.

| File                               | Demonstrates                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `validate-address.ts`              | Creating and validating an address (`shippo.addresses`)                         |
| `create-shipment-and-buy-label.ts` | The core happy path: shipment → rates → purchased label                         |
| `track-shipment.ts`                | Looking up tracking status (`shippo.tracking`), with test-mode tracking numbers |
| `webhook-server-node.ts`           | Receiving + parsing inbound webhooks with plain Node `http`                     |
| `webhook-server-express.ts`        | The same, using Express                                                         |

The two webhook examples are the ones worth reading closely even if you don't run them: they
show `parseEvent()` in context, and — more importantly — that Shippo's webhook spec has no
signature verification, so they re-fetch the referenced object by `object_id` before treating
anything in the payload as trustworthy. See each file's top comment and
[`ROADMAP.md`](../ROADMAP.md) §2 for why.
