[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoNetworkError

# Class: ShippoNetworkError

Defined in: [errors.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L58)

Thrown for failures that never got an HTTP response at all — the
request timed out, the network dropped, DNS failed, etc. Distinct from
`ShippoApiError` so consumers can tell "Shippo said no" apart from
"we couldn't reach Shippo."

## Extends

- [`ShippoError`](ShippoError.md)

## Constructors

### Constructor

> **new ShippoNetworkError**(`message`, `options?`): `ShippoNetworkError`

Defined in: [errors.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d5e63cc7bddf23b738b612ed189591debd6a9b06/src/errors.ts#L59)

#### Parameters

##### message

`string`

##### options?

###### cause?

`unknown`

#### Returns

`ShippoNetworkError`

#### Overrides

[`ShippoError`](ShippoError.md).[`constructor`](ShippoError.md#constructor)
