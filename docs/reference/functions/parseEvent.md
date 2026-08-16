[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / parseEvent

# Function: parseEvent()

> **parseEvent**(`rawBody`): [`ShippoWebhookEvent`](../type-aliases/ShippoWebhookEvent.md)

Defined in: [resources/webhooks.ts:144](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L144)

Parses a raw webhook delivery body into a correctly-typed
`ShippoWebhookEvent`. Accepts either a raw JSON string or an
already-parsed object (e.g. `req.body` from Express, which may be either
depending on middleware). Throws a `ShippoError` if the body isn't a
`{ event, test, data }` envelope or `event` isn't one of the 5 known
values, rather than silently returning something mistyped.

**This does not verify the delivery's authenticity.** Shippo's webhook
spec (the AsyncAPI mirror this module was built against — ROADMAP.md §2)
documents no signature or shared-secret mechanism, unlike Stripe/GitHub-
style webhooks — there is nothing to verify against, so this function
makes no such claim and callers must not treat a successful parse as
proof the request came from Shippo. Before trusting anything
security-sensitive in `data`, re-fetch the referenced object by its
`object_id` through the authenticated API (e.g. `shippo.transactions.get()`)
and treat this payload only as a trigger to do that, not as a source of
truth itself.

## Parameters

### rawBody

`string` \| `object`

## Returns

[`ShippoWebhookEvent`](../type-aliases/ShippoWebhookEvent.md)
