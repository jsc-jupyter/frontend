import { createContext } from "react";
export { useConfigStore } from "./jupyterStore";
export { useFieldStore } from "./fieldStore";

// Types
export type { Config, ConfigState, ConfigActions, ConfigStore } from "./config";
export type {
  FieldStore,
  FieldStoreState,
  FieldStoreActions,
} from "./fieldStore";
export type { Module } from "./module";
export type { Environment } from "./environment";
export type { Storage } from "./storage";

// Hooks
export {
  useConfigs,
  useConfigById,
  useConfigByIndex,
  useConfigsByService,
  useConfigsBySystem,
  useUniqueServices,
  useUniqueSystems,
  useConfigCount,
  useAddConfig,
  useUpdateConfig,
  useDeleteConfig,
  useGetConfigById,
  useAddEnvironment,
  useUpdateEnvironment,
  useDeleteEnvironment,
  useAddStorage,
  useUpdateStorage,
  useDeleteStorage,
  useAddModule,
  useDeleteModule,
  useClearAllConfigs,
  useSetConfigs,
  useConfigEnvironments,
  useSearchConfigs,
} from "./hooks";

export const JupyterlabIDContext = createContext(0);
