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

const getUserEnvironments = (configID: string) => {
  const frontendCollection = getFrontendCollection();

  return frontendCollection.decrypted_user_options[configID].envvariables || {};
};

const getServiceConfig = () => {
  const serviceConfig = getFrontendCollection().serviceConfig;
  return serviceConfig;
};

const getUserModules = (configID: string) => {
  const frontendCollection = getFrontendCollection();
  console.log(configID);
  console.log(frontendCollection.decrypted_user_options);
  // If the configID is not found, return an empty object
  // Fill from userModules in FrontendCollection considering the defaults
  const userModules =
    frontendCollection.decrypted_user_options[configID]?.modules || {};
  return userModules;
};

const getResourcesConfig = () => {
  const resourcesConfig = getFrontendCollection().resourcesConfig;
  return resourcesConfig;
};

const getSystemConfig = () => {
  const systemConfig = getFrontendCollection().systemConfig;
  return systemConfig;
};

export {
  getFrontendCollection,
  getServiceConfig,
  getConfigModules,
  getUserEnvironments,
  getUserModules,
  getResourcesConfig,
  getSystemConfig,
};
