[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / WebhookUpdateRequest

# Interface: WebhookUpdateRequest

Defined in: [resources/webhooks.ts:52](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L52)

`PUT /webhooks/{WebhookId}` request body. Same shape as
`WebhookCreateRequest` with every field optional, since none of the
existing resources in this codebase have a partial-update request type
to follow for PUT semantics — reusing the create shape rather than
inventing a bespoke pattern.

## Properties

### active?

> `optional` **active?**: `boolean`

Defined in: [resources/webhooks.ts:55](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L55)

***

### event?

> `optional` **event?**: [`WebhookEventType`](../type-aliases/WebhookEventType.md)

Defined in: [resources/webhooks.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L54)

***

### url?

> `optional` **url?**: `string`

Defined in: [resources/webhooks.ts:53](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/webhooks.ts#L53)
