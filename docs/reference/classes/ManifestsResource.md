[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ManifestsResource

# Class: ManifestsResource

Defined in: [resources/manifests.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L50)

## Constructors

### Constructor

> **new ManifestsResource**(`client`): `ManifestsResource`

Defined in: [resources/manifests.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L51)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ManifestsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

Defined in: [resources/manifests.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L54)

Creates a new manifest consolidating transactions for carrier pickup.

#### Parameters

##### request

[`ManifestCreateRequest`](../interfaces/ManifestCreateRequest.md)

#### Returns

`Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

***

### get()

> **get**(`manifestId`): `Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

Defined in: [resources/manifests.ts:69](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L69)

Retrieves a single manifest by its object ID.

#### Parameters

##### manifestId

`string`

#### Returns

`Promise`\<[`Manifest`](../interfaces/Manifest.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`Manifest`](../interfaces/Manifest.md)\>\>

Defined in: [resources/manifests.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/manifests.ts#L64)

Retrieves a single page of previously created manifests.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
envelope omits `count`, unlike the confirmed-spec resources' pagination.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`Manifest`](../interfaces/Manifest.md)\>\>
