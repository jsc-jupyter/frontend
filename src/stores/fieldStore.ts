import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface FieldStoreState {
  /** Current field values keyed by field name (e.g. "system", "project"). */
  values: Record<string, unknown>;

  /** Fields marked for collection (sent with form submission). */
  collectedFields: Record<string, boolean>;

  /** Dependency resolution flags — true when the named dependency is met. */
  resolvedDependencies: Record<string, boolean>;

  /** Per-field loading state (e.g. while an async trigger runs). */
  loadingFields: Record<string, boolean>;
}

export interface FieldStoreActions {
  // --- Value access ---
  setValue: (fieldName: string, value: unknown) => void;
  getValue: (fieldName: string) => unknown;
  setValues: (values: Record<string, unknown>) => void;
  getAllValues: () => Record<string, unknown>;

  // --- Collected fields ---
  registerCollected: (fieldName: string) => void;
  unregisterCollected: (fieldName: string) => void;
  getCollectedValues: () => Record<string, unknown>;

  // --- Dependencies ---
  setDependencyResolved: (fieldName: string, resolved: boolean) => void;
  isDependencyResolved: (fieldName: string) => boolean;

  // Loading
  setFieldLoading: (fieldName: string, loading: boolean) => void;
  isFieldLoading: (fieldName: string) => boolean;

  // --- Lifecycle ---
  reset: () => void;
}

export type FieldStore = FieldStoreState & FieldStoreActions;

const initialState: FieldStoreState = {
  values: {},
  collectedFields: {},
  resolvedDependencies: {},
  loadingFields: {},
};

export const useFieldStore = create<FieldStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      setValue: (fieldName, value) => {
        set((state) => {
          state.values[fieldName] = value;
        });
      },

      getValue: (fieldName) => get().values[fieldName],

      setValues: (values) => {
        set((state) => {
          Object.assign(state.values, values);
        });
      },

      getAllValues: () => ({ ...get().values }),

      registerCollected: (fieldName) => {
        set((state) => {
          state.collectedFields[fieldName] = true;
        });
      },

      unregisterCollected: (fieldName) => {
        set((state) => {
          delete state.collectedFields[fieldName];
        });
      },

      getCollectedValues: () => {
        const { values, collectedFields } = get();
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(collectedFields)) {
          if (collectedFields[key] && key in values) {
            result[key] = values[key];
          }
        }
        return result;
      },

      setDependencyResolved: (fieldName, resolved) => {
        set((state) => {
          state.resolvedDependencies[fieldName] = resolved;
        });
      },

      isDependencyResolved: (fieldName) =>
        get().resolvedDependencies[fieldName] ?? false,

      setFieldLoading: (fieldName, loading) => {
        set((state) => {
          state.loadingFields[fieldName] = loading;
        });
      },

      isFieldLoading: (fieldName) => get().loadingFields[fieldName] ?? false,

      reset: () => {
        set(() => ({ ...initialState }));
      },
    })),
    { name: "FieldStore" },
  ),
);
