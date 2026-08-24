[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ListQuery

# Interface: ListQuery

Defined in: [pagination.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L35)

Standard query params accepted by every `list()` method. The index
signature (rather than just `page`/`results`) is what lets this satisfy
`RequestOptions["query"]` directly, structurally.

## Indexable

> \[`key`: `string`\]: `string` \| `number` \| `boolean` \| `undefined`

## Properties

### page?

> `optional` **page?**: `number`

Defined in: [pagination.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L36)

***

### results?

> `optional` **results?**: `number`

Defined in: [pagination.ts:37](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L37)
