import type { ShippoClient } from "../client";

/**
 * Not confirmed for Batches specifically by any reachable source — inferred
 * by analogy with the async-status enums on `Shipment`/`Transaction`
 * (ROADMAP.md §2). Treat as a best-effort guess, not a verified enum.
 */
export type BatchStatus = "VALID" | "INVALID" | "WAITING" | "QUEUED" | "SUCCESS" | "ERROR";

/**
 * Item shape within `batch_shipments` is not detailed by any reachable
 * source (the AsyncAPI spec only names the field, not its sub-shape) —
 * left as an open record rather than guessing field names. Likely wraps a
 * shipment object ID plus a per-item status, based on the three official
 * SDKs' `add_shipments`/`remove_shipments` semantics, but that's inference,
 * not confirmation.
 */
export type BatchShipment = Record<string, unknown>;

/**
 * Item shape within `object_results` is not detailed by any reachable
 * source — left as an open record for the same reason as `BatchShipment`.
 */
export type BatchObjectResult = Record<string, unknown>;

/**
 * `Batch` object. Field *names* are grounded in Shippo's own webhook
 * AsyncAPI spec (`asyncapi/shippo-webhooks-asyncapi.yaml` in the
 * `api-evangelist/shippo` mirror, describing the `batch_created`/
 * `batch_purchased` event payload — ROADMAP.md §2) — that source lists the
 * fields below but doesn't detail their types, so scalar types are a
 * reasonable best-effort inference (matching the pattern used elsewhere in
 * this codebase, e.g. `metadata` as an optional string) rather than
 * independently confirmed. `batch_shipments` and `object_results` are
 * flagged individually above. This resource itself has no reachable
 * OpenAPI coverage at all (unlike Refunds/Webhooks) — see `docs/
 * CONVENTIONS.md` "Spec cross-checking".
 */
export interface Batch {
  object_id?: string;
  /** Inferred by analogy with other async resources — not confirmed for Batches. See `BatchStatus`. */
  status?: BatchStatus;
  object_owner?: string;
  default_carrier_account?: string;
  default_servicelevel_token?: string;
  label_filetype?: string;
  metadata?: string;
  batch_shipments?: BatchShipment[];
  object_results?: BatchObjectResult[];
  object_created?: string;
  object_updated?: string;
}

/**
 * Best-effort request shape for `POST /batches` — no reachable OpenAPI spec
 * covers Batches (see `docs/CONVENTIONS.md` "Spec cross-checking"). Field
 * names are inferred from the `Batch` object's own fields (which *are*
 * grounded, see `Batch`'s doc comment) plus the seed-with-shipments pattern
 * cross-referenced across the Python/JS/C# SDKs' `create` signatures.
 * Flag for follow-up verification against a live account before relying on
 * this shape.
 */
export interface BatchCreateRequest {
  default_carrier_account?: string;
  default_servicelevel_token?: string;
  label_filetype?: string;
  metadata?: string;
  /**
   * Shipments to seed the batch with. Item shape not confirmed — the three
   * SDKs cross-referenced accept either a shipment object ID or an inline
   * shipment-purchase payload here, so this is typed loosely rather than
   * guessing a specific shape.
   */
  default_shipment?: Record<string, unknown>;
  shipments?: Array<string | Record<string, unknown>>;
}

/**
 * Best-effort request/response path for `add_shipments`/`remove_shipments`
 * — endpoint existence is cross-referenced across three official SDKs
 * (Python/JS/C#, all agreeing), but the exact body shape is not documented
 * anywhere reachable. Typed as a bare array of shipment object IDs, the
 * simplest shape consistent with all three SDKs' method signatures; flag
 * for follow-up verification against a live account.
 */
export type BatchShipmentIds = string[];

export class BatchesResource {
  constructor(private readonly client: ShippoClient) {}

  /**
   * Creates a new batch. Endpoint path is best-effort (not confirmed by any
   * reachable OpenAPI spec) — see this module's doc comments.
   */
  async create(request: BatchCreateRequest): Promise<Batch> {
    return this.client.request<Batch>("POST", "/batches", { body: request });
  }

  /** Retrieves a single batch by its object ID. */
  async get(batchId: string): Promise<Batch> {
    return this.client.request<Batch>("GET", `/batches/${batchId}`);
  }

  /**
   * Adds shipments to an existing batch. Endpoint path and body shape are
   * best-effort — see `BatchShipmentIds`'s doc comment.
   */
  async addShipments(batchId: string, shipmentIds: BatchShipmentIds): Promise<Batch> {
    return this.client.request<Batch>("POST", `/batches/${batchId}/add_shipments`, {
      body: { shipments: shipmentIds },
    });
  }

  /**
   * Purchases labels for every shipment in the batch. Endpoint path is
   * best-effort — see this module's doc comments.
   */
  async purchase(batchId: string): Promise<Batch> {
    return this.client.request<Batch>("POST", `/batches/${batchId}/purchase`);
  }

  /**
   * Removes shipments from an existing batch. Endpoint path and body shape
   * are best-effort — see `BatchShipmentIds`'s doc comment.
   */
  async removeShipments(batchId: string, shipmentIds: BatchShipmentIds): Promise<Batch> {
    return this.client.request<Batch>("POST", `/batches/${batchId}/remove_shipments`, {
      body: { shipments: shipmentIds },
    });
  }
}
