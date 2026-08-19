[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / WebhookEventType

# Type Alias: WebhookEventType

> **WebhookEventType** = `"transaction_created"` \| `"transaction_updated"` \| `"batch_created"` \| `"batch_purchased"` \| `"track_updated"`

Defined in: [resources/webhooks.ts:13](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/webhooks.ts#L13)

Closed set of events a webhook can subscribe to, confirmed against
Shippo's own webhook AsyncAPI spec (`asyncapi/shippo-webhooks-asyncapi.yaml`
in the `api-evangelist/shippo` mirror — ROADMAP.md §2).
