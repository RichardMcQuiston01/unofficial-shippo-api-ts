[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShippoError

# Class: ShippoError

Defined in: [errors.ts:6](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/errors.ts#L6)

Base class for every error this package throws. Lets consumers write a
single `catch (err) { if (err instanceof ShippoError) ... }` guard rather
than checking multiple unrelated error types.

## Extends

- `Error`

## Extended by

- [`ShippoApiError`](ShippoApiError.md)
- [`ShippoNetworkError`](ShippoNetworkError.md)

## Constructors

### Constructor

> **new ShippoError**(`message`, `options?`): `ShippoError`

Defined in: [errors.ts:7](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/errors.ts#L7)

#### Parameters

##### message

`string`

##### options?

###### cause?

`unknown`

#### Returns

`ShippoError`

#### Overrides

`Error.constructor`
