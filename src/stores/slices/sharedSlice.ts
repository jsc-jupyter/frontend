import { StateCreator } from "zustand";
import type { CombinedStore, SharedSlice } from "./types";
import {
  getBackendServices,
  getServiceConfig,
  getSystemConfig,
} from "@/utils/frontendCollectionHelper";

const serviceConfig = getServiceConfig();
const systemConfig = getSystemConfig();
const globalMaintenanceSystems = [];

const getAllSystems = (get) => {
  const { kubeSystems, unicore } = get();
  return [
    ...new Set([...kubeSystems, ...(unicore?.systems || [])]),
  ] as string[];
};

const getAvailableSystems = (get, serviceId: string, options: string[]) => {
  const ret = [];
  options.forEach((option) => {
    if (
      serviceConfig["JupyterLab"]?.options &&
      Object.keys(serviceConfig["JupyterLab"]?.options).includes(option)
    ) {
      const subSystems1 =
        serviceConfig["JupyterLab"].options[option].allowedLists.systems;
      ret.push(
        ...getAllSystems(get).filter((system) => subSystems1.includes(system)),
      );
    } else {
      // return all systems, if it's not reduced by the option
      ret.push(...getAllSystems(get));
    }
  });

  let uniqueSystems = [...new Set(ret)];
  uniqueSystems.sort(
    (a, b) => (systemConfig[a].weight || 0) - (systemConfig[b].weight || 0),
  );
  uniqueSystems = uniqueSystems.filter(
    (system) => !globalMaintenanceSystems.includes(system),
  );
  return uniqueSystems.map((item) => [item, item]);
};

const getMissingSystemOptions = (
  get,
  serviceId: string,
  rowId: string,
  options: string[],
) => {
  const availableSystems = getAvailableSystems(get, serviceId, options);
  const missingSystems = getAllSystems(get).filter(
    (system) => !availableSystems.map(([key, value]) => key).includes(system),
  );
  /**
  if (pageType(null) == pageType("workshop")) {
    const allowedSystems = getSpawnerUserOptions()?.workshop?.system || false;
    if (allowedSystems) {
      missingSystems = missingSystems.filter((system) =>
        allowedSystems.includes(system),
      );
    }
  } */
  return missingSystems.map((item) => [item, item]);
};

const backendServicesConfig = getBackendServices();

function fillMappingDict(get) {
  const mappingDict = {};
  Object.entries(serviceConfig).forEach(([key, value]) => {
    const serviceId = value.serviceId ?? key;
    if (!Object.keys(mappingDict).includes(serviceId)) {
      mappingDict[serviceId] = {
        serviceKey: key,
        system: {},
        option: {},
      };
    }
    Object.entries(value.options).forEach(([optionKey, optionValue]) => {
      mappingDict[serviceId]["option"][optionKey] =
        optionValue.mapping ?? optionKey;
    });
    getAllSystems(get).forEach((system) => {
      const backendService = systemConfig[system].backendService;
      const systemType =
        backendServicesConfig[backendService]?.mapping ?? system;
      if (!Object.keys(mappingDict[serviceId]["system"]).includes(systemType)) {
        mappingDict[serviceId]["system"][system] = systemType;
      }
    });
  });
  return mappingDict;
}

export const createSharedSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  SharedSlice
> = (_set, get) => ({
  fillMappingDict: () => fillMappingDict(get),
  getAllSystems: () => getAllSystems(get),
  getAvailableSystems: (serviceId: string, options: string[]) =>
    getAvailableSystems(get, serviceId, options),
  getMissingSystemOptions: (
    serviceId: string,
    rowId: string,
    options: string[],
  ) => getMissingSystemOptions(get, serviceId, rowId, options),
});
