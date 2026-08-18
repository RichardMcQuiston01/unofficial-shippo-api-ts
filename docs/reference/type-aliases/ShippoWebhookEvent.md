[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoWebhookEvent

# Type Alias: ShippoWebhookEvent

> **ShippoWebhookEvent** = [`TransactionWebhookEvent`](../interfaces/TransactionWebhookEvent.md) \| [`TrackUpdatedWebhookEvent`](../interfaces/TrackUpdatedWebhookEvent.md) \| [`BatchWebhookEvent`](../interfaces/BatchWebhookEvent.md)

Defined in: [resources/webhooks.ts:122](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L122)

Discriminated union of every webhook delivery Shippo can send, keyed on
`event`. Narrow with a `switch`/`if` on `event` to get `data` typed
correctly without a hand-rolled cast.
