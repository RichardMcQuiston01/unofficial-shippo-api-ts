[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ParcelsResource

# Class: ParcelsResource

Defined in: [resources/parcels.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/parcels.ts#L31)

## Constructors

### Constructor

> **new ParcelsResource**(`client`): `ParcelsResource`

Defined in: [resources/parcels.ts:32](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/parcels.ts#L32)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ParcelsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Parcel`](../interfaces/Parcel.md)\>

Defined in: [resources/parcels.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/parcels.ts#L35)

Creates a new parcel describing a package's dimensions and weight.

#### Parameters

##### request

[`ParcelCreateRequest`](../interfaces/ParcelCreateRequest.md)

#### Returns

`Promise`\<[`Parcel`](../interfaces/Parcel.md)\>

***

### get()

> **get**(`parcelId`): `Promise`\<[`Parcel`](../interfaces/Parcel.md)\>

Defined in: [resources/parcels.ts:45](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/parcels.ts#L45)

Retrieves a single parcel by its object ID.

#### Parameters

##### parcelId

`string`

#### Returns

`Promise`\<[`Parcel`](../interfaces/Parcel.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Parcel`](../interfaces/Parcel.md)\>\>

Defined in: [resources/parcels.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/parcels.ts#L40)

Retrieves a single page of previously created parcels.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Parcel`](../interfaces/Parcel.md)\>\>
