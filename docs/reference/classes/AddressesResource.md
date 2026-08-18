[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / AddressesResource

# Class: AddressesResource

Defined in: [resources/addresses.ts:57](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L57)

## Constructors

### Constructor

> **new AddressesResource**(`client`): `AddressesResource`

Defined in: [resources/addresses.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L58)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`AddressesResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L61)

Creates a new address for use in shipments, rates, and orders.

#### Parameters

##### request

[`AddressCreateRequest`](../interfaces/AddressCreateRequest.md)

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>

***

### get()

> **get**(`addressId`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L71)

Retrieves a single address by its object ID.

#### Parameters

##### addressId

`string`

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Address`](../interfaces/Address.md)\>\>

Defined in: [resources/addresses.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L66)

Retrieves a single page of previously created addresses.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Address`](../interfaces/Address.md)\>\>

***

### validate()

> **validate**(`addressId`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:76](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/addresses.ts#L76)

Validates an existing address and returns it with `validation_results` populated.

#### Parameters

##### addressId

`string`

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>
