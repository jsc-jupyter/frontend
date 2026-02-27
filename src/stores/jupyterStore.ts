import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ConfigStore } from "./config";
import { getFrontendCollection } from "@/utils/frontendCollectionHelper";
import { getFrontendConfig } from "@/utils/frontendConfigHelper";

// ---------------------------------------------------------------------------
// Initialise collectedFields from the frontend config (moved from fieldStore)
// ---------------------------------------------------------------------------
const frontendConfig = getFrontendConfig();

const initialCollectedFields: Record<string, boolean> = Object.values(
  frontendConfig.services.options[frontendConfig.services.default].tabs,
).reduce(
  (acc, tab) => {
    Object.entries(tab).forEach(([_, fieldConfig]) => {
      Object.entries(fieldConfig as Record<string, unknown>).forEach(
        ([fieldName, config]) => {
          if (
            (config as Record<string, Record<string, Record<string, unknown>>>)
              .input?.options?.collect ??
            true
          ) {
            acc[fieldName] = true;
          } else {
            acc[fieldName] = false;
          }
        },
      );
    });
    return acc;
  },
  {} as Record<string, boolean>,
);

// ---------------------------------------------------------------------------

export const useConfigStore = create<ConfigStore>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      frontendCollection: getFrontendCollection(),
      collectedFields: initialCollectedFields,
      resolvedDependencies: {},
      loadingFields: {},

      // --- Field value access (single source of truth: frontendCollection) ---

      getFieldValue: (configId: string, fieldName: string) => {
        const opts = get().frontendCollection.decrypted_user_options[configId];
        return opts ? (opts as Record<string, unknown>)[fieldName] : undefined;
      },

      setFieldValue: (configId: string, fieldName: string, value: unknown) => {
        set((state) => {
          if (state.frontendCollection.decrypted_user_options[configId]) {
            (
              state.frontendCollection.decrypted_user_options[
                configId
              ] as Record<string, unknown>
            )[fieldName] = value;
          }
        });
      },

      getAllFieldValues: (configId: string) => {
        const opts = get().frontendCollection.decrypted_user_options[configId];
        return opts ? { ...(opts as Record<string, unknown>) } : {};
      },

      // --- Collected fields ---

      registerCollected: (fieldName: string) => {
        set((state) => {
          state.collectedFields[fieldName] = true;
        });
      },

      unregisterCollected: (fieldName: string) => {
        set((state) => {
          delete state.collectedFields[fieldName];
        });
      },

      getCollectedValues: (configId: string) => {
        const { collectedFields } = get();
        const opts = get().frontendCollection.decrypted_user_options[configId];
        if (!opts) return {};
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(collectedFields)) {
          if (
            collectedFields[key] &&
            key in (opts as Record<string, unknown>)
          ) {
            result[key] = (opts as Record<string, unknown>)[key];
          }
        }
        return result;
      },

      // --- Dependencies ---

      setDependencyResolved: (fieldName: string, resolved: boolean) => {
        set((state) => {
          state.resolvedDependencies[fieldName] = resolved;
        });
      },

      isDependencyResolved: (fieldName: string) =>
        get().resolvedDependencies[fieldName] ?? false,

      // --- Loading ---

      setFieldLoading: (fieldName: string, loading: boolean) => {
        set((state) => {
          state.loadingFields[fieldName] = loading;
        });
      },

      isFieldLoading: (fieldName: string) =>
        get().loadingFields[fieldName] ?? false,

      // --- Config access ---

      getConfig: (configId: string) => {
        return get().frontendCollection.decrypted_user_options[
          configId
        ] as unknown;
      },

      getAllConfigs: () => {
        return get().frontendCollection.decrypted_user_options;
      },

      // --- Field state lifecycle ---

      resetFieldState: () => {
        set((state) => {
          state.collectedFields = { ...initialCollectedFields };
          state.resolvedDependencies = {};
          state.loadingFields = {};
        });
      },
    })),
    { name: "ConfigStore" },
  ),
);
