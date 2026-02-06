import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ConfigStore, Config } from "./config";

export const useConfigStore = create<ConfigStore>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      configs: [],

      // Config operations
      addConfig: (configData) => {
        set((state) => {
          const newConfig: Config = {
            ...configData,
          };
          state.configs.push(newConfig);
        });
      },

      updateConfig: (id, updates) => {
        set((state) => {
          const index = state.configs.findIndex((c) => c.id === id);
          if (index !== -1) {
            state.configs[index] = { ...state.configs[index], ...updates };
          }
        });
      },

      deleteConfig: (id) => {
        set((state) => {
          state.configs = state.configs.filter((c) => c.id !== id);
        });
      },

      getConfigById: (id) => {
        return get().configs.find((c) => c.id === id);
      },

      getConfigByIndex: (index) => {
        return get().configs[index];
      },

      addEnvironment: (configId, environment) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            config.environments.push(environment);
          }
        });
      },

      updateEnvironment: (configId, envName, updates) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            const envIndex = config.environments.findIndex(
              (e) => e.name === envName,
            );
            if (envIndex !== -1) {
              config.environments[envIndex] = {
                ...config.environments[envIndex],
                ...updates,
              };
            }
          }
        });
      },

      deleteEnvironment: (configId, envName) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            config.environments = config.environments.filter(
              (e) => e.name !== envName,
            );
          }
        });
      },

      addStorage: (configId, storage) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            config.storages.push(storage);
          }
        });
      },

      updateStorage: (configId, storageIdentifier, updates) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            const storageIndex = config.storages.findIndex(
              (s) => s.id === storageIdentifier,
            );
            if (storageIndex !== -1) {
              config.storages[storageIndex] = {
                ...config.storages[storageIndex],
                ...updates,
              };
            }
          }
        });
      },

      deleteStorage: (configId, storageIdentifier) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            config.storages = config.storages.filter(
              (s) => s.id !== storageIdentifier,
            );
          }
        });
      },

      addModule(configId, module, type) {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            switch (type) {
              case "communities":
                config.communities.push(module);
                break;
              case "extensions":
                config.extensions.push(module);
                break;
              case "kernels":
                config.kernels.push(module);
                break;
              case "proxies":
                config.proxies.push(module);
                break;
              default:
                break;
            }
          }
        });
      },

      deleteModule(configId, moduleName, type) {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            switch (type) {
              case "communities":
                config.communities = config.communities.filter(
                  (m) => m.name !== moduleName,
                );
                console.log("after delete", config.communities);
                break;
              case "extensions":
                config.extensions = config.extensions.filter(
                  (m) => m.name !== moduleName,
                );
                break;
              case "kernels":
                config.kernels = config.kernels.filter(
                  (m) => m.name !== moduleName,
                );
                break;
              case "proxies":
                config.proxies = config.proxies.filter(
                  (m) => m.name !== moduleName,
                );
                break;
              default:
                break;
            }
          }
        });
      },

      clearAllConfigs: () => {
        set((state) => {
          state.configs = [];
        });
      },

      setConfigs: (configs) => {
        set((state) => {
          state.configs = configs;
        });
      },
    })),
    { name: "ConfigStore" },
  ),
);
