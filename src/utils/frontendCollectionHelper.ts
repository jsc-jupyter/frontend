import { Environment } from "@/stores";

const getFrontendCollection = (): any => {
  return window.getFrontendCollection();
};

const getUserEnvironments = (configID: string): Environment[] => {
  const frontendCollection = getFrontendCollection();

  return (
    (frontendCollection.decrypted_user_options[configID]
      .envvariables as Environment[]) || []
  );
};

export { getFrontendCollection, getUserEnvironments };
