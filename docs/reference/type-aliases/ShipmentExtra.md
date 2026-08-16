[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShipmentExtra

# Type Alias: ShipmentExtra

> **ShipmentExtra** = `Record`\<`string`, `unknown`\>

Defined in: [resources/shipments.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/d0d69db2f4048abbd574a3b8cc036ffc876da36f/src/resources/shipments.ts#L16)

Carrier-specific shipment options (signature required, insurance,
Saturday delivery, etc.). Genuinely carrier-dependent — Shippo's own
`shipment-extras` tooling exists specifically because supported options
vary per carrier — so this is intentionally left loosely typed rather
than guessing a fixed shape.
