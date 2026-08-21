[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ServiceGroupsResource

# Class: ServiceGroupsResource

Defined in: [resources/service-groups.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L41)

## Constructors

### Constructor

> **new ServiceGroupsResource**(`client`): `ServiceGroupsResource`

Defined in: [resources/service-groups.ts:42](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L42)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`ServiceGroupsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

Defined in: [resources/service-groups.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L59)

Creates a new service group bundling one or more carrier service levels.

#### Parameters

##### request

[`ServiceGroupCreateRequest`](../interfaces/ServiceGroupCreateRequest.md)

#### Returns

`Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

***

### delete()

> **delete**(`serviceGroupId`): `Promise`\<`void`\>

Defined in: [resources/service-groups.ts:71](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L71)

Deletes a service group.

#### Parameters

##### serviceGroupId

`string`

#### Returns

`Promise`\<`void`\>

***

### list()

> **list**(): `Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)[]\>

Defined in: [resources/service-groups.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L54)

Retrieves every previously created service group.

**Confirmed** by live-contract testing (ROADMAP.md Stage 5) against
`/service-groups` (hyphenated) — an earlier guess of `/service_groups`
404'd live. Unlike every other list endpoint in this package, the real
response is a bare JSON array, not a `{count, next, previous, results}`
(or even `{results}`) envelope — there's no pagination to page through,
hence no `ListQuery` parameter here.

#### Returns

`Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)[]\>

***

### update()

> **update**(`serviceGroupId`, `request`): `Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>

Defined in: [resources/service-groups.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/service-groups.ts#L64)

Updates an existing service group's name or service-level selection.

#### Parameters

##### serviceGroupId

`string`

##### request

[`ServiceGroupUpdateRequest`](../interfaces/ServiceGroupUpdateRequest.md)

#### Returns

`Promise`\<[`ServiceGroup`](../interfaces/ServiceGroup.md)\>
