[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / TrackingStatus

# Interface: TrackingStatus

Defined in: [resources/tracking.ts:22](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L22)

## Properties

### address\_from?

> `optional` **address\_from?**: [`Address`](Address.md)

Defined in: [resources/tracking.ts:25](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L25)

***

### address\_to?

> `optional` **address\_to?**: [`Address`](Address.md)

Defined in: [resources/tracking.ts:26](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L26)

***

### carrier?

> `optional` **carrier?**: `string`

Defined in: [resources/tracking.ts:23](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L23)

***

### eta?

> `optional` **eta?**: `string`

Defined in: [resources/tracking.ts:30](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L30)

***

### original\_eta?

> `optional` **original\_eta?**: `string`

Defined in: [resources/tracking.ts:29](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L29)

***

### servicelevel?

> `optional` **servicelevel?**: [`ServiceLevel`](ServiceLevel.md)

Defined in: [resources/tracking.ts:31](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L31)

***

### tracking\_history?

> `optional` **tracking\_history?**: [`TrackingStatusDetail`](TrackingStatusDetail.md)[]

Defined in: [resources/tracking.ts:33](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L33)

***

### tracking\_number?

> `optional` **tracking\_number?**: `string`

Defined in: [resources/tracking.ts:24](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L24)

***

### tracking\_status?

> `optional` **tracking\_status?**: [`TrackingStatusDetail`](TrackingStatusDetail.md)

Defined in: [resources/tracking.ts:32](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L32)

***

### transaction?

> `optional` **transaction?**: `string`

Defined in: [resources/tracking.ts:28](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/tracking.ts#L28)

Object ID of the transaction (label purchase) this tracking status is for, if any.
