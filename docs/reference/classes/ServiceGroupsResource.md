[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ServiceGroupsResource

# Class: ServiceGroupsResource

Defined in: [resources/service-groups.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L42)

## Constructors

### Constructor

> **new ServiceGroupsResource**(`client`): `ServiceGroupsResource`

Defined in: [resources/service-groups.ts:43](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L43)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ServiceGroupsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

Defined in: [resources/service-groups.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L51)

Creates a new service group bundling one or more carrier service levels.

#### Parameters

##### request

[`ServiceGroupCreateRequest`](../interfaces/ServiceGroupCreateRequest.md)

#### Returns

`Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

***

### delete()

> **delete**(`serviceGroupId`): `Promise`\<`void`\>

Defined in: [resources/service-groups.ts:63](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L63)

Deletes a service group.

#### Parameters

##### serviceGroupId

`string`

#### Returns

`Promise`\<`void`\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>\>

Defined in: [resources/service-groups.ts:46](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L46)

Retrieves a single page of previously created service groups.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>\>

***

### update()

> **update**(`serviceGroupId`, `request`): `Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

Defined in: [resources/service-groups.ts:56](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L56)

Updates an existing service group's name or service-level selection.

#### Parameters

##### serviceGroupId

`string`

##### request

[`ServiceGroupUpdateRequest`](../interfaces/ServiceGroupUpdateRequest.md)

#### Returns

`Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>
