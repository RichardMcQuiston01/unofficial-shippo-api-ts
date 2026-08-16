[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / WebhookEventType

# Type Alias: WebhookEventType

> **WebhookEventType** = `"transaction_created"` \| `"transaction_updated"` \| `"batch_created"` \| `"batch_purchased"` \| `"track_updated"`

Defined in: [resources/webhooks.ts:13](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L13)

Closed set of events a webhook can subscribe to, confirmed against
Shippo's own webhook AsyncAPI spec (`asyncapi/shippo-webhooks-asyncapi.yaml`
in the `api-evangelist/shippo` mirror — ROADMAP.md §2).
