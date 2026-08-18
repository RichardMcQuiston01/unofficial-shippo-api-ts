[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsItemsResource

# Class: CustomsItemsResource

Defined in: [resources/customs-items.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L46)

## Constructors

### Constructor

> **new CustomsItemsResource**(`client`): `CustomsItemsResource`

Defined in: [resources/customs-items.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L47)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CustomsItemsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

Defined in: [resources/customs-items.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L50)

Creates a new customs item describing one line item for customs declarations.

#### Parameters

##### request

[`CustomsItemCreateRequest`](../interfaces/CustomsItemCreateRequest.md)

#### Returns

`Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

***

### get()

> **get**(`customsItemId`): `Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

Defined in: [resources/customs-items.ts:60](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L60)

Retrieves a single customs item by its object ID.

#### Parameters

##### customsItemId

`string`

#### Returns

`Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CustomsItem`](../interfaces/CustomsItem.md)\>\>

Defined in: [resources/customs-items.ts:55](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/customs-items.ts#L55)

Retrieves a single page of previously created customs items.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CustomsItem`](../interfaces/CustomsItem.md)\>\>
