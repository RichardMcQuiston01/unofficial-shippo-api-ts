[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / AddressesResource

# Class: AddressesResource

Defined in: [resources/addresses.ts:57](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L57)

## Constructors

### Constructor

> **new AddressesResource**(`client`): `AddressesResource`

Defined in: [resources/addresses.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L58)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`AddressesResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L61)

Creates a new address for use in shipments, rates, and orders.

#### Parameters

##### request

[`AddressCreateRequest`](../interfaces/AddressCreateRequest.md)

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>

***

### get()

> **get**(`addressId`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L71)

Retrieves a single address by its object ID.

#### Parameters

##### addressId

`string`

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Address`](../interfaces/Address.md)\>\>

Defined in: [resources/addresses.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L66)

Retrieves a single page of previously created addresses.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Address`](../interfaces/Address.md)\>\>

***

### validate()

> **validate**(`addressId`): `Promise`\<[`Address`](../interfaces/Address.md)\>

Defined in: [resources/addresses.ts:85](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/addresses.ts#L85)

Validates an existing address and returns the validated result with
`validation_results` populated.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): the
returned `Address` can have a *different* `object_id` than the one
passed in — Shippo appears to return a separate validated record
rather than mutating the original in place. Don't assume the returned
`object_id` matches `addressId`.

#### Parameters

##### addressId

`string`

#### Returns

`Promise`\<[`Address`](../interfaces/Address.md)\>
