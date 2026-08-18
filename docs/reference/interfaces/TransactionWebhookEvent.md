[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / TransactionWebhookEvent

# Interface: TransactionWebhookEvent

Defined in: [resources/webhooks.ts:91](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L91)

Envelope Shippo POSTs to a registered webhook URL for a `transaction_created`
or `transaction_updated` event.

## Properties

### data

> **data**: [`Transaction`](Transaction.md)

Defined in: [resources/webhooks.ts:95](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L95)

***

### event

> **event**: `"transaction_created"` \| `"transaction_updated"`

Defined in: [resources/webhooks.ts:92](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L92)

***

### test

> **test**: `boolean`

Defined in: [resources/webhooks.ts:94](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L94)

Distinguishes sandbox/test-mode deliveries from real ones.
