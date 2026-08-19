[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsItemsResource

# Class: CustomsItemsResource

Defined in: [resources/customs-items.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-items.ts#L46)

## Constructors

### Constructor

> **new CustomsItemsResource**(`client`): `CustomsItemsResource`

Defined in: [resources/customs-items.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-items.ts#L47)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CustomsItemsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

Defined in: [resources/customs-items.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-items.ts#L50)

Creates a new customs item describing one line item for customs declarations.

#### Parameters

##### request

[`CustomsItemCreateRequest`](../interfaces/CustomsItemCreateRequest.md)

#### Returns

`Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

***

### get()

> **get**(`customsItemId`): `Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

Defined in: [resources/customs-items.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-items.ts#L67)

Retrieves a single customs item by its object ID.

#### Parameters

##### customsItemId

`string`

#### Returns

`Promise`\<[`CustomsItem`](../interfaces/CustomsItem.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CustomsItem`](../interfaces/CustomsItem.md)\>\>

Defined in: [resources/customs-items.ts:60](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-items.ts#L60)

Retrieves a single page of previously created customs items.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
envelope omits `count`, unlike the confirmed-spec resources' pagination.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CustomsItem`](../interfaces/CustomsItem.md)\>\>
