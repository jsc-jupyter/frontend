import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ConfigStore } from "./config";
import { getFrontendCollection } from "@/utils/frontendCollectionHelper";
import { getFrontendConfig } from "@/utils/frontendConfigHelper";

const frontendConfig = getFrontendConfig();
const frontendCollection = getFrontendCollection();

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

for (const defaultValue in frontendConfig.services.options[
  frontendConfig.services.default
].default.options) {
  // property does not yet exists in FrontendCollection, seed it from frontendConfig defaults
  frontendCollection.decrypted_user_options[""][defaultValue] =
    frontendConfig.services.options[
      frontendConfig.services.default
    ].default.options[defaultValue];
}
frontendCollection.decrypted_user_options[""].profile = frontendCollection.decrypted_user_options[""].option;

// ---------------------------------------------------------------------------

export const useConfigStore = create<ConfigStore>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      frontendCollection: frontendCollection,
      collectedFields: initialCollectedFields,
      // --- Field value access (single source of truth: frontendCollection) ---

      getFieldValue: (configId: string, fieldName: string, group?: string) => {
        const opts = get().frontendCollection.decrypted_user_options[configId];
        if (group && group !== "default") {
          return opts
            ? (opts as Record<string, unknown>)[group]?.[fieldName]
            : undefined;
        }
        return opts ? (opts as Record<string, unknown>)[fieldName] : undefined;
      },

      // getFieldValues: (configId: string, fieldNames: string[], group?: string[]) => {
      //   const opts = get().frontendCollection.decrypted_user_options[configId];
      //   const result: Record<string, unknown> = {};
      //   if (!opts) return result;
      //   for (const fieldName of fieldNames) {
      //     if
      //     if (group && group !== "default") {
      //       result[fieldName] = (opts as Record<string, unknown>)[group]?.[fieldName];
      //     } else {
      //       result[fieldName] = (opts as Record<string, unknown>)[fieldName];
      //     }
      //   }
      //   return result;
      // },

      setFieldValue: (
        configId: string,
        fieldName: string,
        value: unknown,
        group?: string,
      ) => {
        set((state) => {
          console.log("Setting field value: ", {
            configId,
            fieldName,
            value,
            group,
          });
          if (group && group !== "default") {
            if (state.frontendCollection.decrypted_user_options[configId]) {
              const groupObj =
                (
                  state.frontendCollection.decrypted_user_options[
                    configId
                  ] as Record<string, unknown>
                )[group] ?? {};
              groupObj[fieldName] = value;
              (
                state.frontendCollection.decrypted_user_options[
                  configId
                ] as Record<string, unknown>
              )[group] = groupObj;
            }
          } else {
            if (state.frontendCollection.decrypted_user_options[configId]) {
              (
                state.frontendCollection.decrypted_user_options[
                  configId
                ] as Record<string, unknown>
              )[fieldName] = value;
            }
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
