import { FrontendCollection } from "@/types/frontendCollection";

// Store state type
export interface ConfigState {
  frontendCollection: FrontendCollection;

  /** Fields marked for collection (sent with form submission). */
  collectedFields: Record<string, boolean>;

  /** Dependency resolution flags — true when the named dependency is met. */
  resolvedDependencies: Record<string, boolean>;

  /** Per-field loading state (e.g. while an async trigger runs). */
  loadingFields: Record<string, boolean>;
}

// Store actions type
export interface ConfigActions {
  getFieldValue: (
    configId: string,
    fieldName: string,
    group?: string,
  ) => unknown;
  setFieldValue: (
    configId: string,
    fieldName: string,
    value: unknown,
    group?: string,
  ) => void;
  getAllFieldValues: (configId: string) => Record<string, unknown>;

  // --- Collected fields ---
  registerCollected: (fieldName: string) => void;
  unregisterCollected: (fieldName: string) => void;
  getCollectedValues: (configId: string) => Record<string, unknown>;
}

// Combined store type
export type ConfigStore = ConfigState & ConfigActions;
