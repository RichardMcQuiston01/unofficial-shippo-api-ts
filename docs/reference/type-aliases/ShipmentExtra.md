[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / ShipmentExtra

# Type Alias: ShipmentExtra

> **ShipmentExtra** = `Record`\<`string`, `unknown`\>

Defined in: [resources/shipments.ts:16](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/shipments.ts#L16)

Carrier-specific shipment options (signature required, insurance,
Saturday delivery, etc.). Genuinely carrier-dependent — Shippo's own
`shipment-extras` tooling exists specifically because supported options
vary per carrier — so this is intentionally left loosely typed rather
than guessing a fixed shape.
