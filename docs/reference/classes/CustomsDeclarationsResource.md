[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CustomsDeclarationsResource

# Class: CustomsDeclarationsResource

Defined in: [resources/customs-declarations.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/customs-declarations.ts#L50)

## Constructors

### Constructor

> **new CustomsDeclarationsResource**(`client`): `CustomsDeclarationsResource`

Defined in: [resources/customs-declarations.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/customs-declarations.ts#L51)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CustomsDeclarationsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

Defined in: [resources/customs-declarations.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/customs-declarations.ts#L54)

Creates a new customs declaration from one or more customs items.

#### Parameters

##### request

[`CustomsDeclarationCreateRequest`](../interfaces/CustomsDeclarationCreateRequest.md)

#### Returns

`Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

***

### get()

> **get**(`customsDeclarationId`): `Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

Defined in: [resources/customs-declarations.ts:68](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/customs-declarations.ts#L68)

Retrieves a single customs declaration by its object ID.

#### Parameters

##### customsDeclarationId

`string`

#### Returns

`Promise`\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>\>

Defined in: [resources/customs-declarations.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/customs-declarations.ts#L61)

Retrieves a single page of previously created customs declarations.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CustomsDeclaration`](../interfaces/CustomsDeclaration.md)\>\>
