import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";

export type RefundStatus = "QUEUED" | "PENDING" | "SUCCESS" | "ERROR";

export interface Refund {
  object_id?: string;
  status?: RefundStatus;
  /** Object ID of the transaction (label) this refund applies to. */
  transaction?: string;
  object_created?: string;
  object_updated?: string;
}

export interface RefundCreateRequest {
  /** Object ID of the transaction (label) to refund. */
  transaction: string;
  /** If true, the refund is processed asynchronously rather than in the response. */
  async?: boolean;
}

export class RefundsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Retrieves a single page of previously requested refunds. */
  async list(query?: ListQuery): Promise<PaginatedList<Refund>> {
    return this.client.request<PaginatedList<Refund>>("GET", "/refunds", { query });
  }

  /** Requests a refund for a previously purchased label (transaction). */
  async create(request: RefundCreateRequest): Promise<Refund> {
    return this.client.request<Refund>("POST", "/refunds", { body: request });
  }

  /** Retrieves a single refund by its object ID. */
  async get(refundId: string): Promise<Refund> {
    return this.client.request<Refund>("GET", `/refunds/${refundId}`);
  }
}
