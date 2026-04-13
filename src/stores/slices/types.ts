export interface EntitlementInfo {
  systempartition: string;
  project: string;
  account: string;
  accounttype: string;
}

export interface Unicore {
  accountType: "normal" | "secondary" | string;
  prefered_username: string;
  entitlements: string[];
  reservations: string[];
  mapSystems: string[];
  mapPartitions: string[];
  defaultPartitions: string[];
  systemPartitions: string[];
  systems: string[];
  accountsBySystemPartition: Record<string, string[]>;
}

export type KubeSlice = {
  kubeOutpostFlavors: any;
  kubeSystems: string[];
  kubeFlavorSystems: string[];
  getAvailableKubeFlavorsS: (systems: string[]) => string[][];
  getUnavailableKubeFlavorsS: (systems: string[]) => string[][];
};

export type UnicoreSlice = {
  unicore: Unicore;
  setUnicore: (unicore: Unicore) => void;
  getUnicoreAccountsS: (systems: string[]) => any[];
  getUnicoreProjectsSA: (systems: string[], accounts: string[]) => string[];
  getUnicoreProjectsS: (systems: string[]) => string[];
  getUnicorePartitionsSAP: (
    systems: string[],
    accounts?: string[],
    projects?: string[],
  ) => any[];
  getUnicoreReservationsSAPP: (
    systems: string[],
    accounts: string[],
    projects: string[],
    partitions: string[],
  ) => any[];
  getAccountOptions: (
    system: string,
    serviceId: string,
    configId: string,
  ) => any[];
  getProjectOptions: (
    system: string,
    account: string,
    serviceId: string,
    configId: string,
  ) => any[];
  getPartitionAndInteractivePartition: (
    system: string,
    account: string,
    project: string,
    serviceId: string,
    configId: string,
  ) => [any[], number];
};

export type SharedSlice = {
  fillMappingDict: () => unknown;
  getAllSystems: () => string[];
  getAvailableSystems: (serviceId: string, options: string[]) => string[][];
  getMissingSystemOptions: (
    serviceId: string,
    rowId: string,
    options: string[],
  ) => string[][];
};

export type CombinedStore = KubeSlice & UnicoreSlice & SharedSlice;
