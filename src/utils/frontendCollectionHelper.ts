import { FrontendCollection } from "@/types/frontendCollection";
import { getFrontendConfig } from "./frontendConfigHelper";

const getFrontendCollection = (): FrontendCollection => {
  const frontendCollection =
    window.getFrontendCollection() as FrontendCollection;
  return frontendCollection;
};

const getUserOptions = () => {
  const userOptions = getFrontendCollection().decrypted_user_options;
  return userOptions;
};

const getUserOption = (configId: string) => {
  if (configId === "") {
    const frontendConfig = getFrontendConfig();
    const ret: Record<string, unknown> = {};
    for (const defaultValue in frontendConfig.services.options[
      frontendConfig.services.default
    ].default.options) {
      // property does not yet exists in FrontendCollection, seed it from frontendConfig defaults
      ret[defaultValue] =
        frontendConfig.services.options[
          frontendConfig.services.default
        ].default.options[defaultValue];
    }
    ret.profile = ret.option;
    return ret;
  }
  const userOptions = getFrontendCollection().decrypted_user_options;
  return userOptions ? (userOptions[configId] as Record<string, unknown>) : {};
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

const getReservations = () => {
  const reservations = getFrontendCollection().reservations;
  return reservations;
};

const getMapSystems = () => {
  const mapSystems = getFrontendCollection().mapSystems;
  return mapSystems;
};

const getMapPartitions = () => {
  const mapPartitions = getFrontendCollection().mapPartitions;
  return mapPartitions;
};

const getDefaultPartitions = () => {
  const defaultPartitions = getFrontendCollection().defaultPartitions;
  return defaultPartitions;
};

export {
  getUserOptions,
  getUserOption,
  getFrontendCollection,
  getServiceConfig,
  getConfigModules,
  getResourcesConfig,
  getSystemConfig,
  getBackendServices,
  getModulesConfig,
  getReservations,
  getMapSystems,
  getMapPartitions,
  getDefaultPartitions,
};
