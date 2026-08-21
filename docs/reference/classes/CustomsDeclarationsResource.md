[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsDeclarationsResource

# Class: CustomsDeclarationsResource

Defined in: [resources/customs-declarations.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L50)

## Constructors

### Constructor

> **new CustomsDeclarationsResource**(`client`): `CustomsDeclarationsResource`

Defined in: [resources/customs-declarations.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L51)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CustomsDeclarationsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

Defined in: [resources/customs-declarations.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L54)

Creates a new customs declaration from one or more customs items.

#### Parameters

##### request

[`CustomsDeclarationCreateRequest`](../interfaces/CustomsDeclarationCreateRequest.md)

#### Returns

`Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

***

### get()

> **get**(`customsDeclarationId`): `Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

Defined in: [resources/customs-declarations.ts:75](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L75)

Retrieves a single customs declaration by its object ID.

#### Parameters

##### customsDeclarationId

`string`

#### Returns

`Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>\>

Defined in: [resources/customs-declarations.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/customs-declarations.ts#L66)

Retrieves a single page of previously created customs declarations.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5): the real
envelope omits `count`, unlike the confirmed-spec resources' pagination.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>\>
