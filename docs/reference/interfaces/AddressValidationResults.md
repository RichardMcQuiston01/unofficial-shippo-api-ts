[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / AddressValidationResults

# Interface: AddressValidationResults

Defined in: [resources/addresses.ts:10](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/addresses.ts#L10)

Result of validating an address. Not detailed in the OpenAPI mirror this
package was built against (ROADMAP.md §2) — this shape is a best-effort
typing from general background knowledge of Shippo's API, not verified
against a reachable primary source. Treat as advisory.

## Properties

### is\_valid?

> `optional` **is\_valid?**: `boolean`

Defined in: [resources/addresses.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/addresses.ts#L11)

***

### messages?

> `optional` **messages?**: `object`[]

Defined in: [resources/addresses.ts:12](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/addresses.ts#L12)

#### code?

> `optional` **code?**: `string`

#### source?

> `optional` **source?**: `string`

#### text?

> `optional` **text?**: `string`

#### type?

> `optional` **type?**: `string`
