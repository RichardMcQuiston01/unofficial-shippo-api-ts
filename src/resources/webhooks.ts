import type { ShippoClient } from "../client";
import { apiPath } from "../api-path";
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

/**
 * Values accepted when creating or updating a webhook subscription: the
 * concrete events above, or `"all"` (Shippo's catch-all subscription,
 * https://docs.goshippo.com/tracking/creating-webhooks). Deliveries still
 * arrive with a concrete `event`, so `parseEvent` keeps the narrower union.
 */
export type WebhookSubscriptionEvent = WebhookEventType | "all";

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
  /** Each webhook subscribes to exactly one event (or `"all"`), not an array. */
  event?: WebhookSubscriptionEvent;
  active?: boolean;
  is_test?: boolean;
  object_created?: string;
  object_updated?: string;
}

export interface WebhookCreateRequest {
  url: string;
  event: WebhookSubscriptionEvent;
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
  event?: WebhookSubscriptionEvent;
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
    return this.client.request<Webhook>("GET", apiPath("/webhooks", webhookId));
  }

  /** Updates an existing webhook subscription's URL, event, or active state. */
  async update(webhookId: string, request: WebhookUpdateRequest): Promise<Webhook> {
    return this.client.request<Webhook>("PUT", apiPath("/webhooks", webhookId), { body: request });
  }

  /** Deletes a webhook subscription so it no longer receives deliveries. */
  async delete(webhookId: string): Promise<void> {
    return this.client.request<void>("DELETE", apiPath("/webhooks", webhookId));
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
 * **This does not authenticate the delivery.** Shippo documents three
 * controls (https://docs.goshippo.com/tracking/webhook-security): an
 * inbound IP allowlist, a self-generated token on the webhook URL, and an
 * HMAC `Shippo-Auth-Signature` header. Run `verifyWebhookSignature()` (HMAC)
 * and/or `verifyWebhookToken()` (URL token) on the raw request BEFORE
 * calling this, and reject the request if they fail. A payload that parses
 * is not proof it came from Shippo. For anything sensitive, still re-fetch
 * the referenced object by its `object_id` through the authenticated API
 * and treat the payload as a trigger only.
 *
 * `test` must be a boolean: a missing or non-boolean value is rejected
 * rather than guessed, so a malformed delivery is never treated as live.
 */
export function parseEvent(rawBody: string | object): ShippoWebhookEvent {
  let parsed: unknown;
  if (typeof rawBody === "string") {
    try {
      parsed = JSON.parse(rawBody);
    } catch (cause) {
      throw new ShippoError("Invalid Shippo webhook payload: body is not valid JSON.", { cause });
    }
  } else {
    parsed = rawBody;
  }

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

  if (typeof test !== "boolean") {
    throw new ShippoError(
      `Invalid Shippo webhook payload: "test" must be a boolean, received ${JSON.stringify(test)}.`,
    );
  }

  if (data === null || typeof data !== "object") {
    throw new ShippoError('Invalid Shippo webhook payload: missing or invalid "data" field.');
  }

  return {
    event,
    test,
    data,
  } as ShippoWebhookEvent;
}
