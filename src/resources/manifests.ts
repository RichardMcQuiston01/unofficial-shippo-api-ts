import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { Address, AddressCreateRequest } from "./addresses";

/**
 * No OpenAPI spec was reachable for Manifests while building this package
 * (ROADMAP.md §2 "Coverage gap"). Method names (`list`, `create`, `get`)
 * are confirmed by cross-referencing Shippo's official Python/JS/C# SDKs.
 * A manifest is a well-established concept (end-of-day carrier pickup
 * document, e.g. a USPS SCAN form) but every field below is a best-effort
 * reconstruction, not verified against a primary source. `status` reuses
 * the `WAITING`/`QUEUED`/`SUCCESS`/`ERROR` pattern seen on `Shipment` and
 * `Transaction` by analogy, not confirmed for Manifests specifically.
 */
export type ManifestStatus = "WAITING" | "QUEUED" | "SUCCESS" | "ERROR";

export interface Manifest {
  object_id: string;
  status: ManifestStatus;
  /** Object ID of the Carrier Account this manifest was generated for. */
  carrier_account: string;
  /** Date the manifest covers, e.g. the transactions created that day. */
  shipment_date: string;
  /** Object IDs of the transactions (labels) included on this manifest. */
  transactions?: string[];
  address_from?: Address;
  /**
   * URLs to the generated manifest document(s), e.g. a PDF SCAN form.
   * Not confirmed by any reachable source -- flagged as best-effort.
   */
  documents?: string[];
  object_created: string;
  object_updated: string;
}

export interface ManifestCreateRequest {
  /** Object ID of the Carrier Account to generate the manifest for. */
  carrier_account: string;
  /** Date the manifest should cover. */
  shipment_date: string;
  /**
   * Object IDs of the transactions to include. Omitting this may mean
   * "include everything for that carrier/date" -- not confirmed.
   */
  transactions?: string[];
  /** An existing address object ID, or inline data to create one. */
  address_from?: string | AddressCreateRequest;
}

export class ManifestsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Creates a new manifest consolidating transactions for carrier pickup. */
  async create(request: ManifestCreateRequest): Promise<Manifest> {
    return this.client.request<Manifest>("POST", "/manifests", { body: request });
  }

  /** Retrieves a single page of previously created manifests. */
  async list(query?: ListQuery): Promise<PaginatedList<Manifest>> {
    return this.client.request<PaginatedList<Manifest>>("GET", "/manifests", { query });
  }

  /** Retrieves a single manifest by its object ID. */
  async get(manifestId: string): Promise<Manifest> {
    return this.client.request<Manifest>("GET", `/manifests/${manifestId}`);
  }
}
