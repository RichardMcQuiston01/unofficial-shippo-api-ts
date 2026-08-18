[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoApiError

# Class: ShippoApiError

Defined in: [errors.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L22)

Thrown when the Shippo API responds with a non-2xx status.

Shippo's error response body shape is not documented anywhere we could
reach while building this client (see ROADMAP.md §2 "Error response
schema" and the Stage 1 spike note) — `body` is intentionally `unknown`
rather than a typed shape. `message` is a best-effort extraction that
falls back gracefully if the body doesn't look like what we expect.

## Extends

- [`ShippoError`](ShippoError.md)

## Constructors

### Constructor

> **new ShippoApiError**(`options`): `ShippoApiError`

Defined in: [errors.ts:34](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L34)

#### Parameters

##### options

###### body

`unknown`

###### requestId

`string` \| `undefined`

###### retryAfterMs

`number` \| `undefined`

###### status

`number`

###### statusText

`string`

###### url

`string`

#### Returns

`ShippoApiError`

#### Overrides

[`ShippoError`](ShippoError.md).[`constructor`](ShippoError.md#constructor)

## Properties

### body

> `readonly` **body**: `unknown`

Defined in: [errors.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L25)

***

### requestId

> `readonly` **requestId**: `string` \| `undefined`

Defined in: [errors.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L26)

***

### retryAfterMs

> `readonly` **retryAfterMs**: `number` \| `undefined`

Defined in: [errors.ts:32](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L32)

Parsed from a `Retry-After` response header (seconds or HTTP-date form),
in milliseconds. `undefined` if the header was absent — Shippo isn't
confirmed to send it, so callers must not assume it's always present.

***

### status

> `readonly` **status**: `number`

Defined in: [errors.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L23)

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [errors.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L24)
