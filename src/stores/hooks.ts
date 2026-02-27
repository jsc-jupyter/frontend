import { useConfigStore } from "./jupyterStore";

// --- Field value access ---

export const useGetFieldValue = (configId: string, fieldName: string) => {
  return useConfigStore((state) => state.getFieldValue(configId, fieldName));
};

// Get a single config by ID
export const useConfigById = (id: string) => {
  return useConfigStore(
    (state) =>
      state.frontendCollection.decrypted_user_options[id] as
        | Record<string, unknown>
        | undefined,
  );
};

// Get all configs
export const useAllConfigs = () => {
  return useConfigStore(
    (state) => state.frontendCollection.decrypted_user_options,
  ) as Record<string, Record<string, unknown>> | undefined;
};
