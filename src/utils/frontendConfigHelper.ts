import { FrontendConfig } from "@/types/frontendConfig";

const getFrontendConfig = (): FrontendConfig => {
  const frontendConfig = window.getFrontendConfig() as FrontendConfig;
  return frontendConfig;
};

export { getFrontendConfig };
