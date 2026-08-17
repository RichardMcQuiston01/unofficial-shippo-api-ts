[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ManifestsResource

# Class: ManifestsResource

Defined in: [resources/manifests.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/manifests.ts#L50)

## Constructors

### Constructor

> **new ManifestsResource**(`client`): `ManifestsResource`

Defined in: [resources/manifests.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/manifests.ts#L51)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ManifestsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

Defined in: [resources/manifests.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/manifests.ts#L54)

Creates a new manifest consolidating transactions for carrier pickup.

#### Parameters

##### request

[`ManifestCreateRequest`](../interfaces/ManifestCreateRequest.md)

#### Returns

`Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

***

### get()

> **get**(`manifestId`): `Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

Defined in: [resources/manifests.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/manifests.ts#L64)

Retrieves a single manifest by its object ID.

#### Parameters

##### manifestId

`string`

#### Returns

`Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Manifest`](../interfaces/Manifest.md)\>\>

Defined in: [resources/manifests.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/manifests.ts#L59)

Retrieves a single page of previously created manifests.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`Manifest`](../interfaces/Manifest.md)\>\>
