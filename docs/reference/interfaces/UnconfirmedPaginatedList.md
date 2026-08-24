[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / UnconfirmedPaginatedList

# Interface: UnconfirmedPaginatedList\<T\>

Defined in: [pagination.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L23)

The list-endpoint response shape for resources with no reachable OpenAPI
spec (ROADMAP.md §2 "Coverage gap"). Live-contract testing against a real
Shippo test-mode account (ROADMAP.md Stage 5) found these endpoints don't
reliably include `count`/`next`/`previous`, and `results` can be `null`
instead of `[]` when empty — unlike `PaginatedList`, nothing here beyond
the field's presence is guaranteed.

## Type Parameters

### T

`T`

## Properties

### count?

> `optional` **count?**: `number`

Defined in: [pagination.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L24)

***

### next?

> `optional` **next?**: `string` \| `null`

Defined in: [pagination.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L25)

***

### previous?

> `optional` **previous?**: `string` \| `null`

Defined in: [pagination.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L26)

***

### results

> **results**: `T`[] \| `null`

Defined in: [pagination.ts:27](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/pagination.ts#L27)
