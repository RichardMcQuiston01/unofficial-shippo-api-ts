[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / UserParcelTemplatesResource

# Class: UserParcelTemplatesResource

Defined in: [resources/user-parcel-templates.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L48)

## Constructors

### Constructor

> **new UserParcelTemplatesResource**(`client`): `UserParcelTemplatesResource`

Defined in: [resources/user-parcel-templates.ts:49](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L49)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`UserParcelTemplatesResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L59)

Creates a new reusable parcel template.

#### Parameters

##### request

[`UserParcelTemplateCreateRequest`](../interfaces/UserParcelTemplateCreateRequest.md)

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

***

### delete()

> **delete**(`userParcelTemplateId`): `Promise`\<`void`\>

Defined in: [resources/user-parcel-templates.ts:86](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L86)

Deletes a user parcel template.

#### Parameters

##### userParcelTemplateId

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`userParcelTemplateId`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L66)

Retrieves a single user parcel template by its object ID.

#### Parameters

##### userParcelTemplateId

`string`

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>\>

Defined in: [resources/user-parcel-templates.ts:52](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L52)

Retrieves a single page of previously created user parcel templates.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>\>

***

### update()

> **update**(`userParcelTemplateId`, `request`): `Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>

Defined in: [resources/user-parcel-templates.ts:74](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L74)

Updates an existing user parcel template.

#### Parameters

##### userParcelTemplateId

`string`

##### request

[`UserParcelTemplateUpdateRequest`](../interfaces/UserParcelTemplateUpdateRequest.md)

#### Returns

`Promise`\<[`UserParcelTemplate`](../interfaces/UserParcelTemplate.md)\>
