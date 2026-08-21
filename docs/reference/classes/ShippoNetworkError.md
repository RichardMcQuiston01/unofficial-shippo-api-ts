[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoNetworkError

# Class: ShippoNetworkError

Defined in: [errors.ts:58](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/errors.ts#L58)

Thrown for failures that never got an HTTP response at all — the
request timed out, the network dropped, DNS failed, etc. Distinct from
`ShippoApiError` so consumers can tell "Shippo said no" apart from
"we couldn't reach Shippo."

## Extends

- [`ShippoError`](ShippoError.md)

## Constructors

### Constructor

> **new ShippoNetworkError**(`message`, `options?`): `ShippoNetworkError`

Defined in: [errors.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/errors.ts#L59)

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
