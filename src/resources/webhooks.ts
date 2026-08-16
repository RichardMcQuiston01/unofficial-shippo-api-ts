import type { ShippoClient } from "../client";
import { ShippoError } from "../errors";
import type { ListQuery, PaginatedList } from "../pagination";
import type { Batch } from "./batches";
import type { TrackingStatus } from "./tracking";
import type { Transaction } from "./transactions";

/**
 * Closed set of events a webhook can subscribe to, confirmed against
 * Shippo's own webhook AsyncAPI spec (`asyncapi/shippo-webhooks-asyncapi.yaml`
 * in the `api-evangelist/shippo` mirror — ROADMAP.md §2).
 */
export type WebhookEventType =
  | "transaction_created"
  | "transaction_updated"
  | "batch_created"
  | "batch_purchased"
  | "track_updated";

const WEBHOOK_EVENT_TYPES: readonly WebhookEventType[] = [
  "transaction_created",
  "transaction_updated",
  "batch_created",
  "batch_purchased",
  "track_updated",
];

export interface Webhook {
  object_id?: string;
  url?: string;
  /** Each webhook subscribes to exactly one event, not an array. */
  event?: WebhookEventType;
  active?: boolean;
  is_test?: boolean;
  object_created?: string;
  object_updated?: string;
}

export interface WebhookCreateRequest {
  url: string;
  event: WebhookEventType;
  active?: boolean;
}

/**
 * `PUT /webhooks/{WebhookId}` request body. Same shape as
 * `WebhookCreateRequest` with every field optional, since none of the
 * existing resources in this codebase have a partial-update request type
 * to follow for PUT semantics — reusing the create shape rather than
 * inventing a bespoke pattern.
 */
export interface WebhookUpdateRequest {
  url?: string;
  event?: WebhookEventType;
  active?: boolean;
}

export class WebhooksResource {
  constructor(private readonly client: ShippoClient) {}

  /** Retrieves a single page of registered webhook subscriptions. */
  async list(query?: ListQuery): Promise<PaginatedList<Webhook>> {
    return this.client.request<PaginatedList<Webhook>>("GET", "/webhooks", { query });
  }

  /** Registers a new webhook subscription for a single event type. */
  async create(request: WebhookCreateRequest): Promise<Webhook> {
    return this.client.request<Webhook>("POST", "/webhooks", { body: request });
  }

  /** Retrieves a single webhook subscription by its object ID. */
  async get(webhookId: string): Promise<Webhook> {
    return this.client.request<Webhook>("GET", `/webhooks/${webhookId}`);
  }

  /** Updates an existing webhook subscription's URL, event, or active state. */
  async update(webhookId: string, request: WebhookUpdateRequest): Promise<Webhook> {
    return this.client.request<Webhook>("PUT", `/webhooks/${webhookId}`, { body: request });
  }

  /** Deletes a webhook subscription so it no longer receives deliveries. */
  async delete(webhookId: string): Promise<void> {
    await this.client.request<void>("DELETE", `/webhooks/${webhookId}`);
  }
}

/**
 * Envelope Shippo POSTs to a registered webhook URL for a `transaction_created`
 * or `transaction_updated` event.
 */
export interface TransactionWebhookEvent {
  event: "transaction_created" | "transaction_updated";
  /** Distinguishes sandbox/test-mode deliveries from real ones. */
  test: boolean;
  data: Transaction;
}

/** Envelope Shippo POSTs to a registered webhook URL for a `track_updated` event. */
export interface TrackUpdatedWebhookEvent {
  event: "track_updated";
  test: boolean;
  data: TrackingStatus;
}

/**
 * Envelope Shippo POSTs to a registered webhook URL for a `batch_created` or
 * `batch_purchased` event. `data`'s shape (`Batch`) carries the same
 * best-effort caveats documented in `./batches` — grounded in field names
 * from the AsyncAPI spec, but not independently confirmed field-by-field.
 */
export interface BatchWebhookEvent {
  event: "batch_created" | "batch_purchased";
  test: boolean;
  data: Batch;
}

/**
 * Discriminated union of every webhook delivery Shippo can send, keyed on
 * `event`. Narrow with a `switch`/`if` on `event` to get `data` typed
 * correctly without a hand-rolled cast.
 */
export type ShippoWebhookEvent =
  TransactionWebhookEvent | TrackUpdatedWebhookEvent | BatchWebhookEvent;

/**
 * Parses a raw webhook delivery body into a correctly-typed
 * `ShippoWebhookEvent`. Accepts either a raw JSON string or an
 * already-parsed object (e.g. `req.body` from Express, which may be either
 * depending on middleware). Throws a `ShippoError` if the body isn't a
 * `{ event, test, data }` envelope or `event` isn't one of the 5 known
 * values, rather than silently returning something mistyped.
 *
 * **This does not verify the delivery's authenticity.** Shippo's webhook
 * spec (the AsyncAPI mirror this module was built against — ROADMAP.md §2)
 * documents no signature or shared-secret mechanism, unlike Stripe/GitHub-
 * style webhooks — there is nothing to verify against, so this function
 * makes no such claim and callers must not treat a successful parse as
 * proof the request came from Shippo. Before trusting anything
 * security-sensitive in `data`, re-fetch the referenced object by its
 * `object_id` through the authenticated API (e.g. `shippo.transactions.get()`)
 * and treat this payload only as a trigger to do that, not as a source of
 * truth itself.
 */
export function parseEvent(rawBody: string | object): ShippoWebhookEvent {
  const parsed: unknown = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;

  if (parsed === null || typeof parsed !== "object") {
    throw new ShippoError("Invalid Shippo webhook payload: expected a JSON object.");
  }

  const record = parsed as Record<string, unknown>;
  const { event, test, data } = record;

  if (typeof event !== "string" || !WEBHOOK_EVENT_TYPES.includes(event as WebhookEventType)) {
    throw new ShippoError(
      `Invalid Shippo webhook payload: unrecognized "event" value ${JSON.stringify(event)}. ` +
        `Expected one of: ${WEBHOOK_EVENT_TYPES.join(", ")}.`,
    );
  }

  if (data === null || typeof data !== "object") {
    throw new ShippoError('Invalid Shippo webhook payload: missing or invalid "data" field.');
  }

  return {
    event,
    test: Boolean(test),
    data,
  } as ShippoWebhookEvent;
}
