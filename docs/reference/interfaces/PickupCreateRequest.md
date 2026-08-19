[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / PickupCreateRequest

# Interface: PickupCreateRequest

Defined in: [resources/pickups.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L33)

## Properties

### carrier\_account

> **carrier\_account**: `string`

Defined in: [resources/pickups.ts:35](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L35)

Object ID of the Carrier Account the pickup is requested with.

***

### location

> **location**: [`PickupLocation`](PickupLocation.md)

Defined in: [resources/pickups.ts:36](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L36)

***

### metadata?

> `optional` **metadata?**: `string`

Defined in: [resources/pickups.ts:41](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L41)

***

### requested\_end\_time

> **requested\_end\_time**: `string`

Defined in: [resources/pickups.ts:40](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L40)

***

### requested\_start\_time

> **requested\_start\_time**: `string`

Defined in: [resources/pickups.ts:39](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L39)

***

### transactions

> **transactions**: `string`[]

Defined in: [resources/pickups.ts:38](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/pickups.ts#L38)

Object IDs of the purchased transactions (labels) to be picked up.
