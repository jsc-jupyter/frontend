import { useConfigStore } from "./jupyterStore";

// Get all configs
export const useConfigs = () => {
  return useConfigStore((state) => state.configs);
};

// Get a single config by ID
export const useConfigById = (id: string) => {
  return useConfigStore((state) =>
    state.configs.find((config) => config.id === id),
  );
};
// Get a single config by Index
export const useConfigByIndex = (index: number) => {
  return useConfigStore((state) => state.configs[index]);
};

// Get configs filtered by service
export const useConfigsByService = (service: string) => {
  return useConfigStore((state) =>
    state.configs.filter((config) => config.service === service),
  );
};

// Get configs filtered by system
export const useConfigsBySystem = (system: string) => {
  return useConfigStore((state) =>
    state.configs.filter((config) => config.system === system),
  );
};

// Get all unique services
export const useUniqueServices = () => {
  return useConfigStore((state) => {
    const services = new Set(state.configs.map((c) => c.service));
    return Array.from(services);
  });
};

// Get all unique systems
export const useUniqueSystems = () => {
  return useConfigStore((state) => {
    const systems = new Set(state.configs.map((c) => c.system));
    return Array.from(systems);
  });
};

// Config Operations
export const useConfigCount = () => {
  return useConfigStore((state) => state.configs.length);
};

export const useAddConfig = () => {
  return useConfigStore((state) => state.addConfig);
};

export const useUpdateConfig = () => {
  return useConfigStore((state) => state.updateConfig);
};

export const useDeleteConfig = () => {
  return useConfigStore((state) => state.deleteConfig);
};

export const useGetConfigById = () => {
  return useConfigStore((state) => state.getConfigById);
};

// Environment Operations
export const useAddEnvironment = () => {
  return useConfigStore((state) => state.addEnvironment);
};

export const useUpdateEnvironment = () => {
  return useConfigStore((state) => state.updateEnvironment);
};

export const useDeleteEnvironment = () => {
  return useConfigStore((state) => state.deleteEnvironment);
};

export const useAddStorage = () => {
  return useConfigStore((state) => state.addStorage);
};

// Storage Operations
export const useUpdateStorage = () => {
  return useConfigStore((state) => state.updateStorage);
};

export const useDeleteStorage = () => {
  return useConfigStore((state) => state.deleteStorage);
};

// Modules Operations
export const useAddModule = () => {
  return useConfigStore((state) => state.addModule);
};

export const useDeleteModule = () => {
  return useConfigStore((state) => state.deleteModule);
};

// Config Bulk Operations
export const useClearAllConfigs = () => {
  return useConfigStore((state) => state.clearAllConfigs);
};

export const useSetConfigs = () => {
  return useConfigStore((state) => state.setConfigs);
};

// Get environments for a specific config
export const useConfigEnvironments = (configId: string) => {
  return useConfigStore((state) => {
    const config = state.configs.find((c) => c.id === configId);
    return config?.environments ?? [];
  });
};

// Search configs by name
export const useSearchConfigs = (searchTerm: string) => {
  return useConfigStore((state) =>
    state.configs.filter((config) =>
      config.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
};
