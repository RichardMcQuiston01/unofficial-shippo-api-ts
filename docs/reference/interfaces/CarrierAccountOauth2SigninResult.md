[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierAccountOauth2SigninResult

# Interface: CarrierAccountOauth2SigninResult

Defined in: [resources/carrier-accounts.ts:47](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L47)

Result of `initiateOauth2Signin` — a URL to send the end user to so they
can authorize Shippo against their carrier account. **Unconfirmed**: no
reachable spec covers this flow's response shape; guessed from the
general OAuth2 Authorization Code pattern described in ROADMAP.md §2's
`goshippo` org research (the `shippo-demos-oauth` sample).

## Properties

### redirect\_url

> **redirect\_url**: `string`

Defined in: [resources/carrier-accounts.ts:48](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L48)
