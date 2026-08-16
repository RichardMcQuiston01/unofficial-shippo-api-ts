[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierParcelTemplate

# Interface: CarrierParcelTemplate

Defined in: [resources/carrier-parcel-templates.ts:18](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L18)

A Shippo/carrier-predefined parcel template (e.g. "USPS Small Flat Rate
Box") — read-only presets, distinct from `UserParcelTemplate`
(`./user-parcel-templates`), which a business creates itself.

**Unconfirmed / best effort**: not present in the reachable OpenAPI
mirror (ROADMAP.md §2 lists this among the 9 resources with no spec
coverage). Fields are guessed from the `Parcel` shape (`./parcels`), on
the assumption a template predefines the same dimensional fields. The
identifier field is a particular unknown — many Shippo template-like
objects use a `token` rather than `object_id`; both are included here,
optional, until confirmed.

## Properties

### carrier?

> `optional` **carrier?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L23)

***

### distance\_unit?

> `optional` **distance\_unit?**: [`DistanceUnit`](../type-aliases/DistanceUnit.md)

Defined in: [resources/carrier-parcel-templates.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L27)

***

### height?

> `optional` **height?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L26)

***

### length?

> `optional` **length?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L24)

***

### name?

> `optional` **name?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L22)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:19](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L19)

***

### token?

> `optional` **token?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L21)

Alternate identifier some Shippo template objects use instead of `object_id`. Unconfirmed which applies here.

***

### width?

> `optional` **width?**: `string`

Defined in: [resources/carrier-parcel-templates.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-parcel-templates.ts#L25)
