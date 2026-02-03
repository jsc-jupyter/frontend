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

      addExtension: (configId, extension, type) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            switch (type) {
              case "communities":
                config.communities.push(extension);
                break;
              case "extensions":
                config.extensions.push(extension);
                break;
              case "kernels":
                config.kernels.push(extension);
                break;
              case "proxies":
                config.proxies.push(extension);
                break;
            }
          }
        });
      },

      updateExtension: (configId, extensionName, updates, type) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            let extensionArray;
            switch (type) {
              case "communities":
                extensionArray = config.communities;
                break;
              case "extensions":
                extensionArray = config.extensions;
                break;
              case "kernels":
                extensionArray = config.kernels;
                break;
              case "proxies":
                extensionArray = config.proxies;
                break;
              default:
                return;
            }
            const extIndex = extensionArray.findIndex(
              (e) => e.name === extensionName,
            );
            if (extIndex !== -1) {
              extensionArray[extIndex] = {
                ...extensionArray[extIndex],
                ...updates,
              };
            }
          }
        });
      },

      deleteExtension: (configId, extensionName, type) => {
        set((state) => {
          const config = state.configs.find((c) => c.id === configId);
          if (config) {
            switch (type) {
              case "communities":
                config.communities = config.communities.filter(
                  (e) => e.name !== extensionName,
                );
                break;
              case "extensions":
                config.extensions = config.extensions.filter(
                  (e) => e.name !== extensionName,
                );
                break;
              case "kernels":
                config.kernels = config.kernels.filter(
                  (e) => e.name !== extensionName,
                );
                break;
              case "proxies":
                config.proxies = config.proxies.filter(
                  (e) => e.name !== extensionName,
                );
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
