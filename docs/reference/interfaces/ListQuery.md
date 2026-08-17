[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ListQuery

# Interface: ListQuery

Defined in: [pagination.ts:20](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/pagination.ts#L20)

Standard query params accepted by every `list()` method. The index
signature (rather than just `page`/`results`) is what lets this satisfy
`RequestOptions["query"]` directly, structurally.

## Indexable

> \[`key`: `string`\]: `string` \| `number` \| `boolean` \| `undefined`

## Properties

### page?

> `optional` **page?**: `number`

Defined in: [pagination.ts:21](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/pagination.ts#L21)

***

### results?

> `optional` **results?**: `number`

Defined in: [pagination.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/pagination.ts#L22)
