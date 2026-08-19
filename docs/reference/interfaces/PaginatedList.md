[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / PaginatedList

# Interface: PaginatedList\<T\>

Defined in: [pagination.ts:8](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L8)

The list-endpoint response shape confirmed against Shippo's OpenAPI
mirror (ROADMAP.md §2 "Pagination") — Django REST Framework's standard
`page`/`results` pagination.

## Type Parameters

### T

`T`

## Properties

### count

> **count**: `number`

Defined in: [pagination.ts:9](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L9)

***

### next

> **next**: `string` \| `null`

Defined in: [pagination.ts:10](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L10)

***

### previous

> **previous**: `string` \| `null`

Defined in: [pagination.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L11)

***

### results

> **results**: `T`[]

Defined in: [pagination.ts:12](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L12)
