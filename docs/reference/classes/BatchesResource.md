[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / BatchesResource

# Class: BatchesResource

Defined in: [resources/batches.ts:88](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L88)

## Constructors

### Constructor

> **new BatchesResource**(`client`): `BatchesResource`

Defined in: [resources/batches.ts:89](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L89)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`BatchesResource`

## Methods

### addShipments()

> **addShipments**(`batchId`, `shipmentIds`): `Promise`\<[`Batch`](../interfaces/Batch.md)\>

Defined in: [resources/batches.ts:108](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L108)

Adds shipments to an existing batch. Endpoint path and body shape are
best-effort — see `BatchShipmentIds`'s doc comment.

#### Parameters

##### batchId

`string`

##### shipmentIds

[`BatchShipmentIds`](../type-aliases/BatchShipmentIds.md)

#### Returns

`Promise`\<[`Batch`](../interfaces/Batch.md)\>

***

### create()

> **create**(`request`): `Promise`\<[`Batch`](../interfaces/Batch.md)\>

Defined in: [resources/batches.ts:95](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L95)

Creates a new batch. Endpoint path is best-effort (not confirmed by any
reachable OpenAPI spec) — see this module's doc comments.

#### Parameters

##### request

[`BatchCreateRequest`](../interfaces/BatchCreateRequest.md)

#### Returns

`Promise`\<[`Batch`](../interfaces/Batch.md)\>

***

### get()

> **get**(`batchId`): `Promise`\<[`Batch`](../interfaces/Batch.md)\>

Defined in: [resources/batches.ts:100](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L100)

Retrieves a single batch by its object ID.

#### Parameters

##### batchId

`string`

#### Returns

`Promise`\<[`Batch`](../interfaces/Batch.md)\>

***

### purchase()

> **purchase**(`batchId`): `Promise`\<[`Batch`](../interfaces/Batch.md)\>

Defined in: [resources/batches.ts:118](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L118)

Purchases labels for every shipment in the batch. Endpoint path is
best-effort — see this module's doc comments.

#### Parameters

##### batchId

`string`

#### Returns

`Promise`\<[`Batch`](../interfaces/Batch.md)\>

***

### removeShipments()

> **removeShipments**(`batchId`, `shipmentIds`): `Promise`\<[`Batch`](../interfaces/Batch.md)\>

Defined in: [resources/batches.ts:126](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/batches.ts#L126)

Removes shipments from an existing batch. Endpoint path and body shape
are best-effort — see `BatchShipmentIds`'s doc comment.

#### Parameters

##### batchId

`string`

##### shipmentIds

[`BatchShipmentIds`](../type-aliases/BatchShipmentIds.md)

#### Returns

`Promise`\<[`Batch`](../interfaces/Batch.md)\>
