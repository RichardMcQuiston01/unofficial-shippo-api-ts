[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / WebhooksResource

# Class: WebhooksResource

Defined in: [resources/webhooks.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L58)

## Constructors

### Constructor

> **new WebhooksResource**(`client`): `WebhooksResource`

Defined in: [resources/webhooks.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L59)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`WebhooksResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Webhook`](../interfaces/Webhook.md)\>

Defined in: [resources/webhooks.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L67)

Registers a new webhook subscription for a single event type.

#### Parameters

##### request

[`WebhookCreateRequest`](../interfaces/WebhookCreateRequest.md)

#### Returns

`Promise`\<[`Webhook`](../interfaces/Webhook.md)\>

***

### delete()

> **delete**(`webhookId`): `Promise`\<`void`\>

Defined in: [resources/webhooks.ts:82](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L82)

Deletes a webhook subscription so it no longer receives deliveries.

#### Parameters

##### webhookId

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`webhookId`): `Promise`\<[`Webhook`](../interfaces/Webhook.md)\>

Defined in: [resources/webhooks.ts:72](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L72)

Retrieves a single webhook subscription by its object ID.

#### Parameters

##### webhookId

`string`

#### Returns

`Promise`\<[`Webhook`](../interfaces/Webhook.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Webhook`](../interfaces/Webhook.md)\>\>

Defined in: [resources/webhooks.ts:62](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L62)

Retrieves a single page of registered webhook subscriptions.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Webhook`](../interfaces/Webhook.md)\>\>

***

### update()

> **update**(`webhookId`, `request`): `Promise`\<[`Webhook`](../interfaces/Webhook.md)\>

Defined in: [resources/webhooks.ts:77](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/webhooks.ts#L77)

Updates an existing webhook subscription's URL, event, or active state.

#### Parameters

##### webhookId

`string`

##### request

[`WebhookUpdateRequest`](../interfaces/WebhookUpdateRequest.md)

#### Returns

`Promise`\<[`Webhook`](../interfaces/Webhook.md)\>
