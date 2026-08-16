[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / Pickup

# Interface: Pickup

Defined in: [resources/pickups.ts:51](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L51)

Response shape for a scheduled pickup. Kept intentionally smaller and
more conservative than the request type — fields like `confirmation_code`
are a reasonable guess for this domain (a carrier-assigned confirmation
number) but are not confirmed against any primary source, so every field
here is optional rather than asserted as guaranteed-present.

## Properties

### carrier\_account?

> `optional` **carrier\_account?**: `string`

Defined in: [resources/pickups.ts:53](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L53)

***

### confirmation\_code?

> `optional` **confirmation\_code?**: `string`

Defined in: [resources/pickups.ts:57](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L57)

Carrier's confirmation number for the scheduled pickup, if provided. Unconfirmed field.

***

### confirmed\_end\_time?

> `optional` **confirmed\_end\_time?**: `string`

Defined in: [resources/pickups.ts:62](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L62)

***

### confirmed\_start\_time?

> `optional` **confirmed\_start\_time?**: `string`

Defined in: [resources/pickups.ts:61](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L61)

Carrier-confirmed pickup window, which may differ from the requested one. Unconfirmed field.

***

### location?

> `optional` **location?**: [`PickupLocation`](PickupLocation.md)

Defined in: [resources/pickups.ts:54](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L54)

***

### object\_created?

> `optional` **object\_created?**: `string`

Defined in: [resources/pickups.ts:63](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L63)

***

### object\_id?

> `optional` **object\_id?**: `string`

Defined in: [resources/pickups.ts:52](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L52)

***

### object\_updated?

> `optional` **object\_updated?**: `string`

Defined in: [resources/pickups.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L64)

***

### requested\_end\_time?

> `optional` **requested\_end\_time?**: `string`

Defined in: [resources/pickups.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L59)

***

### requested\_start\_time?

> `optional` **requested\_start\_time?**: `string`

Defined in: [resources/pickups.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L58)

***

### transactions?

> `optional` **transactions?**: `string`[]

Defined in: [resources/pickups.ts:55](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/pickups.ts#L55)
