[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / paginate

# Function: paginate()

> **paginate**\<`T`\>(`client`, `path`, `query?`): `AsyncGenerator`\<`T`, `void`, `void`\>

Defined in: [pagination.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/pagination.ts#L36)

Iterates every item across every page of a list endpoint, following
`next` until it's `null`. One HTTP request per page, made lazily as the
generator is consumed — safe to `for await` over an unbounded resource
without fetching pages you never read.

`list()` methods on resource modules return a single `PaginatedList<T>`
page (matching the raw API shape); reach for this helper when you want
every result instead of one page at a time.

## Type Parameters

### T

`T`

## Parameters

### client

[`ShippoClient`](../classes/ShippoClient.md)

### path

`string`

### query?

`Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

## Returns

`AsyncGenerator`\<`T`, `void`, `void`\>
