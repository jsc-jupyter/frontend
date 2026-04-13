import { FrontendCollection } from "@/types/frontendCollection";

const getFrontendCollection = (): FrontendCollection => {
  const frontendCollection =
    window.getFrontendCollection() as FrontendCollection;
  return frontendCollection;
};

const getConfigModules = () => {
  const configModules = getFrontendCollection().userModules;
  return configModules;
};

const getServiceConfig = () => {
  const serviceConfig = getFrontendCollection().serviceConfig;
  return serviceConfig;
};

const getResourcesConfig = () => {
  const resourcesConfig = getFrontendCollection().resourcesConfig;
  return resourcesConfig;
};

const getSystemConfig = () => {
  const systemConfig = getFrontendCollection().systemConfig;
  return systemConfig;
};

const getBackendServices = () => {
  const backendServices = getFrontendCollection().backendServices;
  return backendServices;
};

const getModulesConfig = () => {
  const modulesConfig = getFrontendCollection().userModules;
  return modulesConfig;
};

export {
  getFrontendCollection,
  getServiceConfig,
  getConfigModules,
  getResourcesConfig,
  getSystemConfig,
  getBackendServices,
  getModulesConfig,
};
