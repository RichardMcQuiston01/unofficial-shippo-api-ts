[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / BatchCreateRequest

# Interface: BatchCreateRequest

Defined in: [resources/batches.ts:63](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L63)

Best-effort request shape for `POST /batches` — no reachable OpenAPI spec
covers Batches (see `docs/CONVENTIONS.md` "Spec cross-checking"). Field
names are inferred from the `Batch` object's own fields (which *are*
grounded, see `Batch`'s doc comment) plus the seed-with-shipments pattern
cross-referenced across the Python/JS/C# SDKs' `create` signatures.
Flag for follow-up verification against a live account before relying on
this shape.

## Properties

### default\_carrier\_account?

> `optional` **default\_carrier\_account?**: `string`

Defined in: [resources/batches.ts:64](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L64)

***

### default\_servicelevel\_token?

> `optional` **default\_servicelevel\_token?**: `string`

Defined in: [resources/batches.ts:65](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L65)

***

### default\_shipment?

> `optional` **default\_shipment?**: `Record`\<`string`, `unknown`\>

Defined in: [resources/batches.ts:74](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L74)

Shipments to seed the batch with. Item shape not confirmed — the three
SDKs cross-referenced accept either a shipment object ID or an inline
shipment-purchase payload here, so this is typed loosely rather than
guessing a specific shape.

***

### label\_filetype?

> `optional` **label\_filetype?**: `string`

Defined in: [resources/batches.ts:66](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L66)

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/batches.ts:67](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L67)

***

### shipments?

> `optional` **shipments?**: (`string` \| `Record`\<`string`, `unknown`\>)[]

Defined in: [resources/batches.ts:75](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/batches.ts#L75)
