[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ServiceGroupRateService

# Type Alias: ServiceGroupRateService

> **ServiceGroupRateService** = `Record`\<`string`, `unknown`\> & `object`

Defined in: [resources/service-groups.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/service-groups.ts#L11)

A single carrier service level entry within a service group's selection.
**Unconfirmed / best effort**: this is the least-confirmed part of this
resource — not present in the reachable OpenAPI mirror (ROADMAP.md §2),
and the SDK method inventory doesn't detail the selection shape either.
Left loose (extra unknown keys allowed) rather than presented as exact.

## Type Declaration

### object\_id?

> `optional` **object\_id?**: `string`

### service\_level?

> `optional` **service\_level?**: `string`
