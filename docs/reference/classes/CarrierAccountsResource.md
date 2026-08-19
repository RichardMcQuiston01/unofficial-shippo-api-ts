[**@richardmcquiston01/shippo-api**](../README.md)

***

[@richardmcquiston01/shippo-api](../README.md) / CarrierAccountsResource

# Class: CarrierAccountsResource

Defined in: [resources/carrier-accounts.ts:59](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L59)

## Constructors

### Constructor

> **new CarrierAccountsResource**(`client`): `CarrierAccountsResource`

Defined in: [resources/carrier-accounts.ts:60](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L60)

#### Parameters

##### client

[`ShippoClient`](ShippoClient.md)

#### Returns

`CarrierAccountsResource`

## Methods

### create()

> **create**(`request`): `Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

Defined in: [resources/carrier-accounts.ts:70](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L70)

Connects a carrier account to this Shippo account using explicit credentials.

#### Parameters

##### request

[`CarrierAccountCreateRequest`](../interfaces/CarrierAccountCreateRequest.md)

#### Returns

`Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

***

### get()

> **get**(`carrierAccountId`): `Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

Defined in: [resources/carrier-accounts.ts:75](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L75)

Retrieves a single carrier account by its object ID.

#### Parameters

##### carrierAccountId

`string`

#### Returns

`Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

***

### getRegistrationStatus()

> **getRegistrationStatus**(`carrierAccountId`): `Promise`\<[`CarrierAccountRegistrationStatus`](../interfaces/CarrierAccountRegistrationStatus.md)\>

Defined in: [resources/carrier-accounts.ts:134](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L134)

Checks the registration/verification status of a carrier account
connected via `register` or `initiateOauth2Signin`.

**Unconfirmed / best effort**: same caveats as `initiateOauth2Signin`
— not in the reachable spec, path and shape guessed from the SDK
method inventory alone.

#### Parameters

##### carrierAccountId

`string`

#### Returns

`Promise`\<[`CarrierAccountRegistrationStatus`](../interfaces/CarrierAccountRegistrationStatus.md)\>

***

### initiateOauth2Signin()

> **initiateOauth2Signin**(`carrier`, `request?`): `Promise`\<[`CarrierAccountOauth2SigninResult`](../interfaces/CarrierAccountOauth2SigninResult.md)\>

Defined in: [resources/carrier-accounts.ts:101](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L101)

Starts the OAuth2 Authorization Code flow for connecting a carrier
account (e.g. UPS) without handling raw credentials directly, returning
a URL to redirect the end user to.

**Unconfirmed / best effort**: not present in the reachable OpenAPI
mirror (ROADMAP.md §2). Cross-referenced from the official Python/JS/C#
SDKs' `InitiateOauth2Signin` method existing, and from the
`shippo-demos-oauth` sample describing the general flow, but the exact
request path, params, and response shape here are a guess — treat as
advisory pending confirmation against a real account.

#### Parameters

##### carrier

`string`

##### request?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<[`CarrierAccountOauth2SigninResult`](../interfaces/CarrierAccountOauth2SigninResult.md)\>

***

### list()

> **list**(`query?`): `Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>\>

Defined in: [resources/carrier-accounts.ts:63](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L63)

Retrieves a single page of carrier accounts connected to this Shippo account.

#### Parameters

##### query?

[`ListQuery`](../interfaces/ListQuery.md)

#### Returns

`Promise`\<[`PaginatedList`](../interfaces/PaginatedList.md)\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>\>

***

### register()

> **register**(`carrier`, `request?`): `Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

Defined in: [resources/carrier-accounts.ts:120](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L120)

Registers a carrier account outside the OAuth2 flow (e.g. submitting
carrier credentials directly for registration/verification).

**Unconfirmed / best effort**: same caveats as `initiateOauth2Signin`
— not in the reachable spec, path and shape guessed from the SDK
method inventory alone.

#### Parameters

##### carrier

`string`

##### request?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

***

### update()

> **update**(`carrierAccountId`, `request`): `Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>

Defined in: [resources/carrier-accounts.ts:80](https://github.com/RichardMcQuiston01/unofficial-shippo-api-ts/blob/942f0967e40e5e379d5a2098d7bac96c0887b7fc/src/resources/carrier-accounts.ts#L80)

Updates an existing carrier account, e.g. to toggle `active` or rotate credentials.

#### Parameters

##### carrierAccountId

`string`

##### request

[`CarrierAccountUpdateRequest`](../interfaces/CarrierAccountUpdateRequest.md)

#### Returns

`Promise`\<[`CarrierAccount`](../interfaces/CarrierAccount.md)\>
