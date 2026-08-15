/**
 * Placeholder entry point for Stage 0 scaffolding.
 * Real resource clients land in Stage 1 (HTTP client) and Stage 2/3
 * (resource modules) — see ROADMAP.md.
 */

export const SDK_VERSION = "0.0.0";

export interface ShippoClientOptions {
  /** Shippo API token, sent as `Authorization: ShippoToken <apiKey>`. */
  apiKey: string;
}

export class Shippo {
  readonly apiKey: string;

  constructor(options: ShippoClientOptions) {
    this.apiKey = options.apiKey;
  }
}
