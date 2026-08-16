import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";

/**
 * Carrier-specific authentication parameters (account number, API key,
 * meter number, etc.). Genuinely carrier-dependent — what a carrier
 * account needs varies per carrier, same reasoning as `Shipment.extra`
 * (`./shipments`) — so this is intentionally left loosely typed rather
 * than guessing a fixed shape.
 */
export type CarrierAccountParameters = Record<string, unknown>;

export interface CarrierAccount {
  object_id?: string;
  /** Carrier token, e.g. `"usps"`, `"ups"`, `"fedex"`. Not a fixed enum — the full carrier list isn't confirmed. */
  carrier?: string;
  /** The account ID/number with that carrier. */
  account_id?: string;
  active?: boolean;
  test?: boolean;
  parameters?: CarrierAccountParameters;
  object_created?: string;
  object_updated?: string;
}

export interface CarrierAccountCreateRequest {
  carrier: string;
  account_id: string;
  parameters?: CarrierAccountParameters;
  active?: boolean;
}

export interface CarrierAccountUpdateRequest {
  carrier?: string;
  account_id?: string;
  parameters?: CarrierAccountParameters;
  active?: boolean;
}

/**
 * Result of `initiateOauth2Signin` — a URL to send the end user to so they
 * can authorize Shippo against their carrier account. **Unconfirmed**: no
 * reachable spec covers this flow's response shape; guessed from the
 * general OAuth2 Authorization Code pattern described in ROADMAP.md §2's
 * `goshippo` org research (the `shippo-demos-oauth` sample).
 */
export interface CarrierAccountOauth2SigninResult {
  redirect_url: string;
}

/**
 * Result of `getRegistrationStatus`. **Unconfirmed** shape — see the class
 * doc comments on the three OAuth2-adjacent methods below.
 */
export interface CarrierAccountRegistrationStatus {
  status: string;
}

export class CarrierAccountsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Retrieves a single page of carrier accounts connected to this Shippo account. */
  async list(query?: ListQuery): Promise<PaginatedList<CarrierAccount>> {
    return this.client.request<PaginatedList<CarrierAccount>>("GET", "/carrier_accounts", {
      query,
    });
  }

  /** Connects a carrier account to this Shippo account using explicit credentials. */
  async create(request: CarrierAccountCreateRequest): Promise<CarrierAccount> {
    return this.client.request<CarrierAccount>("POST", "/carrier_accounts", { body: request });
  }

  /** Retrieves a single carrier account by its object ID. */
  async get(carrierAccountId: string): Promise<CarrierAccount> {
    return this.client.request<CarrierAccount>("GET", `/carrier_accounts/${carrierAccountId}`);
  }

  /** Updates an existing carrier account, e.g. to toggle `active` or rotate credentials. */
  async update(
    carrierAccountId: string,
    request: CarrierAccountUpdateRequest,
  ): Promise<CarrierAccount> {
    return this.client.request<CarrierAccount>("PUT", `/carrier_accounts/${carrierAccountId}`, {
      body: request,
    });
  }

  /**
   * Starts the OAuth2 Authorization Code flow for connecting a carrier
   * account (e.g. UPS) without handling raw credentials directly, returning
   * a URL to redirect the end user to.
   *
   * **Unconfirmed / best effort**: not present in the reachable OpenAPI
   * mirror (ROADMAP.md §2). Cross-referenced from the official Python/JS/C#
   * SDKs' `InitiateOauth2Signin` method existing, and from the
   * `shippo-demos-oauth` sample describing the general flow, but the exact
   * request path, params, and response shape here are a guess — treat as
   * advisory pending confirmation against a real account.
   */
  async initiateOauth2Signin(
    carrier: string,
    request?: Record<string, unknown>,
  ): Promise<CarrierAccountOauth2SigninResult> {
    return this.client.request<CarrierAccountOauth2SigninResult>(
      "POST",
      `/carrier_accounts/${carrier}/oauth2/initiate`,
      { body: request },
    );
  }

  /**
   * Registers a carrier account outside the OAuth2 flow (e.g. submitting
   * carrier credentials directly for registration/verification).
   *
   * **Unconfirmed / best effort**: same caveats as `initiateOauth2Signin`
   * — not in the reachable spec, path and shape guessed from the SDK
   * method inventory alone.
   */
  async register(carrier: string, request?: Record<string, unknown>): Promise<CarrierAccount> {
    return this.client.request<CarrierAccount>("POST", `/carrier_accounts/${carrier}/register`, {
      body: request,
    });
  }

  /**
   * Checks the registration/verification status of a carrier account
   * connected via `register` or `initiateOauth2Signin`.
   *
   * **Unconfirmed / best effort**: same caveats as `initiateOauth2Signin`
   * — not in the reachable spec, path and shape guessed from the SDK
   * method inventory alone.
   */
  async getRegistrationStatus(carrierAccountId: string): Promise<CarrierAccountRegistrationStatus> {
    return this.client.request<CarrierAccountRegistrationStatus>(
      "GET",
      `/carrier_accounts/${carrierAccountId}/registration_status`,
    );
  }
}
