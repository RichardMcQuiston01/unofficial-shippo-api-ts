[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ServiceGroup

# Interface: ServiceGroup

Defined in: [resources/service-groups.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L26)

Bundles multiple carrier service levels together for rate-shopping /
checkout purposes (e.g. "show customers only these 3 service levels at
checkout").

**Unconfirmed / best effort**: not present in the reachable OpenAPI
mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
coverage). Fields guessed from the SDK method inventory and the
resource's stated purpose only.

## Properties

### name?

> `optional` **name?**: `string`

Defined in: [resources/service-groups.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L28)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/service-groups.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L27)

***

### rate\_ids\_services?

> `optional` **rate\_ids\_services?**: [`ServiceGroupRateService`](../type-aliases/ServiceGroupRateService.md)[]

Defined in: [resources/service-groups.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/service-groups.ts#L29)
