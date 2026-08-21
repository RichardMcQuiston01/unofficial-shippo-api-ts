[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / UserParcelTemplatesResource

# Class: UserParcelTemplatesResource

Defined in: [resources/user-parcel-templates.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L49)

## Constructors

### Constructor

> **new UserParcelTemplatesResource**(`client`): `UserParcelTemplatesResource`

Defined in: [resources/user-parcel-templates.ts:50](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L50)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`UserParcelTemplatesResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:69](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L69)

Creates a new reusable parcel template.

#### Parameters

##### request

[`UserParcelTemplateCreateRequest`](../interfaces/UserParcelTemplateCreateRequest.md)

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

***

### delete()

> **delete**(`userParcelTemplateId`): `Promise`\<`void`\>

Defined in: [resources/user-parcel-templates.ts:96](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L96)

Deletes a user parcel template.

#### Parameters

##### userParcelTemplateId

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`userParcelTemplateId`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:76](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L76)

Retrieves a single user parcel template by its object ID.

#### Parameters

##### userParcelTemplateId

`string`

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>\>

Defined in: [resources/user-parcel-templates.ts:60](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L60)

Retrieves a single page of previously created user parcel templates.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
`/user-parcel-templates` (hyphenated, not the underscored path an
earlier guess used) — the envelope has no `count`/`next`/`previous`,
and `results` is `null` rather than `[]` when the account has none.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`UnconfirmedPaginatedList`](../interfaces/UnconfirmedPaginatedList.md)\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>\>

***

### update()

> **update**(`userParcelTemplateId`, `request`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:84](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/user-parcel-templates.ts#L84)

Updates an existing user parcel template.

#### Parameters

##### userParcelTemplateId

`string`

##### request

[`UserParcelTemplateUpdateRequest`](../interfaces/UserParcelTemplateUpdateRequest.md)

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>
