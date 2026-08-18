[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / UserParcelTemplate

# Interface: UserParcelTemplate

Defined in: [resources/user-parcel-templates.ts:15](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L15)

A reusable, user-created parcel preset (e.g. "my standard shipping box"),
distinct from `CarrierParcelTemplate` (`./carrier-parcel-templates`),
which is predefined by Shippo/the carrier and read-only.

**Unconfirmed / best effort**: not present in the reachable OpenAPI
mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
coverage). Reasonably confident this mirrors `Parcel` (`./parcels`) plus
a `name`, based on the SDK method inventory and the resource's purpose.

## Properties

### distance\_unit?

> `optional` **distance\_unit?**: [`DistanceUnit`](../type-aliases/DistanceUnit.md)

Defined in: [resources/user-parcel-templates.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L21)

***

### height?

> `optional` **height?**: `string`

Defined in: [resources/user-parcel-templates.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L20)

***

### length?

> `optional` **length?**: `string`

Defined in: [resources/user-parcel-templates.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L18)

***

### mass\_unit?

> `optional` **mass\_unit?**: [`MassUnit`](../type-aliases/MassUnit.md)

Defined in: [resources/user-parcel-templates.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L23)

***

### name?

> `optional` **name?**: `string`

Defined in: [resources/user-parcel-templates.ts:17](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L17)

***

### object\_created?

> `optional` **object\_created?**: `string`

Defined in: [resources/user-parcel-templates.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L24)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/user-parcel-templates.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L16)

***

### object\_updated?

> `optional` **object\_updated?**: `string`

Defined in: [resources/user-parcel-templates.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L25)

***

### weight?

> `optional` **weight?**: `string`

Defined in: [resources/user-parcel-templates.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L22)

***

### width?

> `optional` **width?**: `string`

Defined in: [resources/user-parcel-templates.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/resources/user-parcel-templates.ts#L19)
