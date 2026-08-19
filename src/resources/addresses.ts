import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";

/**
 * Result of validating an address. Not detailed in the OpenAPI mirror this
 * package was built against (ROADMAP.md §2) — this shape is a best-effort
 * typing from general background knowledge of Shippo's API, not verified
 * against a reachable primary source. Treat as advisory.
 */
export interface AddressValidationResults {
  is_valid?: boolean;
  messages?: Array<{
    source?: string;
    code?: string;
    text?: string;
    type?: string;
  }>;
}

export interface Address {
  object_id: string;
  is_complete: boolean;
  name: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
  phone?: string;
  email?: string;
  is_residential?: boolean;
  validation_results?: AddressValidationResults;
  object_created: string;
  object_updated: string;
}

export interface AddressCreateRequest {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
  company?: string;
  street2?: string;
  phone?: string;
  email?: string;
  is_residential?: boolean;
  /** Validate the address synchronously as part of creating it. */
  validate?: boolean;
}

export class AddressesResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new address for use in shipments, rates, and orders. */
  async create(request: AddressCreateRequest): Promise<Address> {
    return this.client.request<Address>("POST", "/addresses", { body: request });
  }

  /** Retrieves a single page of previously created addresses. */
  async list(query?: ListQuery): Promise<PaginatedList<Address>> {
    return this.client.request<PaginatedList<Address>>("GET", "/addresses", { query });
  }

  /** Retrieves a single address by its object ID. */
  async get(addressId: string): Promise<Address> {
    return this.client.request<Address>("GET", `/addresses/${addressId}`);
  }

  /**
   * Validates an existing address and returns the validated result with
   * `validation_results` populated.
   *
   * **Confirmed** by live-contract testing (ROADMAP.md Stage 5): the
   * returned `Address` can have a *different* `object_id` than the one
   * passed in — Shippo appears to return a separate validated record
   * rather than mutating the original in place. Don't assume the returned
   * `object_id` matches `addressId`.
   */
  async validate(addressId: string): Promise<Address> {
    return this.client.request<Address>("GET", `/addresses/${addressId}/validate`);
  }
}
