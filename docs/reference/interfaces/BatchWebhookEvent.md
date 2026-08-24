[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / BatchWebhookEvent

# Interface: BatchWebhookEvent

Defined in: [resources/webhooks.ts:111](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/webhooks.ts#L111)

Envelope Shippo POSTs to a registered webhook URL for a `batch_created` or
`batch_purchased` event. `data`'s shape (`Batch`) carries the same
best-effort caveats documented in `./batches` — grounded in field names
from the AsyncAPI spec, but not independently confirmed field-by-field.

## Properties

### data

> **data**: [`Batch`](Batch.md)

Defined in: [resources/webhooks.ts:114](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/webhooks.ts#L114)

***

### event

> **event**: `"batch_created"` \| `"batch_purchased"`

Defined in: [resources/webhooks.ts:112](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/webhooks.ts#L112)

***

### test

> **test**: `boolean`

Defined in: [resources/webhooks.ts:113](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/webhooks.ts#L113)
