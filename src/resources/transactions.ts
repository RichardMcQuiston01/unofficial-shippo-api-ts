import type { ShippoClient } from "../client";
import type { ListQuery, PaginatedList } from "../pagination";
import type { TrackingStatusValue } from "./tracking";

export type TransactionStatus =
  "WAITING" | "QUEUED" | "SUCCESS" | "ERROR" | "REFUNDED" | "REFUNDPENDING" | "REFUNDREJECTED";

export type LabelFileType =
  "PNG" | "PNG_2.3x7.5" | "PDF" | "PDF_2.3x7.5" | "PDF_4x6" | "PDF_4x8" | "PDF_Letter" | "ZPLII";

export interface Transaction {
  object_id: string;
  status: TransactionStatus;
  tracking_number?: string;
  tracking_url_provider?: string;
  tracking_status?: TrackingStatusValue;
  /** URL to the shipping label file (PDF/PNG/ZPL, per the request's `label_file_type`). */
  label_url?: string;
  /** URL to the commercial invoice, present for international shipments. */
  commercial_invoice_url?: string;
  /** Object ID of the rate this label was purchased for. */
  rate: string;
  metadata?: string;
  object_created: string;
  object_updated: string;
}

export interface TransactionCreateRequest {
  /** Object ID of the rate to purchase a label for. */
  rate: string;
  label_file_type: LabelFileType;
  metadata?: string;
  /** If true, the label is generated asynchronously rather than in the response. */
  async?: boolean;
}

export class TransactionsResource {
  constructor(private readonly client: ShippoClient) {}

  /** Purchases a shipping label for the given rate. */
  async create(request: TransactionCreateRequest): Promise<Transaction> {
    return this.client.request<Transaction>("POST", "/transactions", { body: request });
  }

  /** Retrieves a single page of previously purchased transactions (labels). */
  async list(query?: ListQuery): Promise<PaginatedList<Transaction>> {
    return this.client.request<PaginatedList<Transaction>>("GET", "/transactions", { query });
  }

  /** Retrieves a single transaction by its object ID. */
  async get(transactionId: string): Promise<Transaction> {
    return this.client.request<Transaction>("GET", `/transactions/${transactionId}`);
  }
}
