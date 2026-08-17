[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierAccountParameters

# Type Alias: CarrierAccountParameters

> **CarrierAccountParameters** = `Record`\<`string`, `unknown`\>

Defined in: [resources/carrier-accounts.ts:11](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/carrier-accounts.ts#L11)

Carrier-specific authentication parameters (account number, API key,
meter number, etc.). Genuinely carrier-dependent — what a carrier
account needs varies per carrier, same reasoning as `Shipment.extra`
(`./shipments`) — so this is intentionally left loosely typed rather
than guessing a fixed shape.
