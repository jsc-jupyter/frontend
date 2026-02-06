import { Storage } from "./storage";
import { Environment } from "./environment";
import { Module } from "./module";

export interface Config {
  id: string;
  name: string;
  service: string;
  system: string;
  option: string;
  profile: string;
  environments: Environment[];
  storages: Storage[];
  communities: Module[];
  extensions: Module[];
  kernels: Module[];
  proxies: Module[];
}

// Store state type
export interface ConfigState {
  configs: Config[];
}

// Store actions type
export interface ConfigActions {
  // Config operations
  addConfig: (config: Config) => void;
  updateConfig: (id: string, updates: Partial<Omit<Config, "id">>) => void;
  deleteConfig: (id: string) => void;
  getConfigById: (id: string) => Config | undefined;
  getConfigByIndex: (index: number) => Config | undefined;

  // Environment operations
  addEnvironment: (configId: string, environment: Environment) => void;
  updateEnvironment: (
    configId: string,
    envName: string,
    updates: Partial<Environment>,
  ) => void;
  deleteEnvironment: (configId: string, envName: string) => void;

  // Storage operations
  addStorage: (configId: string, storage: Storage) => void;
  updateStorage: (
    configId: string,
    storageIdentifier: number,
    updates: Partial<Storage>,
  ) => void;
  deleteStorage: (configId: string, storageIdentifier: number) => void;

  // Module operations
  addModule: (configId: string, module: Module, type: string) => void;
  deleteModule: (configId: string, moduleName: string, type: string) => void;

  // Bulk operationsk
  clearAllConfigs: () => void;
  setConfigs: (configs: Config[]) => void;
}

// Combined store type
export type ConfigStore = ConfigState & ConfigActions;
