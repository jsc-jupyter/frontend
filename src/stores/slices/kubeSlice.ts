import { StateCreator } from "zustand";
import type { CombinedStore, KubeSlice } from "./types";
import { useConfigStore } from "../jupyterStore";

const systemConfig =
  useConfigStore.getState().frontendCollection.systemConfig || {};
const backendServicesConfig =
  useConfigStore.getState().frontendCollection.backendServices || {};

const kubeOutpostFlavors = window.getAuthState()?.outpost_flavors || true;

function _getKubeSystems() {
  return Object.keys(systemConfig).filter((system) => {
    const backendService = systemConfig[system].backendService;
    return backendServicesConfig[backendService]?.type === "kube";
  });
}

const kubeSystems = _getKubeSystems();

function _getKubeFlavorSystems() {
  return Object.keys(systemConfig).filter((system) => {
    const backendService = systemConfig[system].backendService;
    return backendServicesConfig[backendService]?.flavorsRequired;
  });
}

const kubeFlavorSystems = _getKubeFlavorSystems();

function getAvailableKubeFlavorsS(systems: string[]) {
  const ret = [];

  systems.forEach((system) => {
    const allFlavors = kubeOutpostFlavors[system];
    if (allFlavors) {
      ret.push(
        ...Object.keys(allFlavors)
          .filter((key) => allFlavors[key].max != 0)
          .filter(
            (key) =>
              allFlavors[key].current < allFlavors[key].max ||
              allFlavors[key].max == -1,
          )
          .sort((a, b) => allFlavors[b].weight - allFlavors[a].weight)
          .map((key) => [key, allFlavors[key].display_name]),
      );
    }
  });
  return ret;
}

function getUnavailableKubeFlavorsS(systems: string[]) {
  const ret = [];

  systems.forEach((system) => {
    const allFlavors = kubeOutpostFlavors[system];

    if (allFlavors) {
      ret.push(
        ...Object.keys(allFlavors)
          .filter((key) => allFlavors[key].max != 0)
          .filter(
            (key) =>
              allFlavors[key].current >= allFlavors[key].max &&
              allFlavors[key].max != -1,
          )
          .sort((a, b) => allFlavors[b].weight - allFlavors[a].weight)
          .map((key) => [key, allFlavors[key].display_name]),
      );
    }
  });
  return ret;
}

export const createKubeSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  KubeSlice
> = () => ({
  kubeOutpostFlavors,
  kubeSystems,
  kubeFlavorSystems,
  getAvailableKubeFlavorsS,
  getUnavailableKubeFlavorsS,
});
