import { StateCreator } from "zustand";
import type {
  CombinedStore,
  UnicoreSlice,
  Unicore,
  EntitlementInfo,
} from "./types";
import { useConfigStore } from "../jupyterStore";

// Extract necessary information from the frontend collection and auth state
const resourcesConfig =
  useConfigStore.getState().frontendCollection.resourcesConfig || {};

const resPattern =
  /^urn:(?<namespace>.+?(?=:res:)):res:(?<systempartition>[^:]+):(?<project>[^:]+):act:(?<account>[^:]+):(?<accounttype>[^:]+)$/;
const prefered_username = window.getAuthState().preferred_username || "none";
const entitlements = Array.isArray(
  window.getAuthState().oauth_user.entitlements,
)
  ? window.getAuthState().oauth_user.entitlements
  : [window.getAuthState().oauth_user.entitlements];
const reservations =
  useConfigStore.getState().frontendCollection.reservations || {};
const mapSystems =
  useConfigStore.getState().frontendCollection.mapSystems || {};
const mapPartitions =
  useConfigStore.getState().frontendCollection.mapPartitions || {};
const defaultPartitions =
  useConfigStore.getState().frontendCollection.defaultPartitions || {};
const systemConfig =
  useConfigStore.getState().frontendCollection.systemConfig || {};
const backendServices =
  useConfigStore.getState().frontendCollection.backendServices || {};

const extractEntitlementsInfo = (entitlement: string) => {
  const match = resPattern.exec(entitlement);
  if (match && match.groups) {
    const system_ = mapSystems[match.groups.systempartition.toLowerCase()];
    const partition_ =
      mapPartitions[match.groups.systempartition.toLowerCase()];
    if (Object.keys(resourcesConfig[system_] ?? {}).includes(partition_)) {
      return {
        systempartition: match.groups.systempartition,
        project: match.groups.project,
        account: match.groups.account,
        accounttype: match.groups.accounttype,
      } as EntitlementInfo;
    }
  }
  return null;
};

const _getUnicoreAccountType = () => {
  for (const entitlement of entitlements) {
    const entitlementInfo = extractEntitlementsInfo(entitlement);

    if (entitlementInfo && entitlementInfo.account === prefered_username) {
      return entitlementInfo.accounttype;
    }
  }
  return null;
};

const accountType = _getUnicoreAccountType();

function _getUnicoreSystemPartitions() {
  const systemPartitions = entitlements
    .map(extractEntitlementsInfo)
    .filter(Boolean)
    .map((tmp: EntitlementInfo) => tmp.systempartition);

  if (accountType === "normal") {
    return [...new Set(systemPartitions)] as string[];
  }

  if (accountType === "secondary") {
    return [
      ...new Set(
        systemPartitions.filter((systempartition: string) => {
          return entitlements
            .map(extractEntitlementsInfo)
            .filter(Boolean)
            .some(
              (tmp: EntitlementInfo) =>
                tmp.systempartition === systempartition &&
                tmp.account === prefered_username,
            );
        }),
      ),
    ] as string[];
  }

  return [];
}

const unicoreSystemPartitions = _getUnicoreSystemPartitions();

function _getUnicoreSystems() {
  const systems = unicoreSystemPartitions
    .map((key) => mapSystems[key.toLowerCase()])
    .filter((system) => system);

  if (accountType === "normal") {
    return [...new Set(systems)];
  }

  if (accountType === "secondary") {
    return [
      ...new Set(
        systems.filter((system) => {
          return entitlements
            .map(extractEntitlementsInfo)
            .filter(Boolean)
            .some(
              (tmp: EntitlementInfo) =>
                tmp.systempartition &&
                mapSystems[tmp.systempartition.toLowerCase()] === system &&
                tmp.account === prefered_username,
            );
        }),
      ),
    ] as string[];
  }

  return [];
}

function _getAllUnicoreAccountsBySystemPartition() {
  const accountsBySystemPartition = {} as Record<string, Set<string>>;

  unicoreSystemPartitions.forEach((systempartition) => {
    accountsBySystemPartition[systempartition] = new Set();
  });

  entitlements.forEach((entitlement: string) => {
    const entitlementInfo = extractEntitlementsInfo(entitlement);

    if (
      entitlementInfo &&
      unicoreSystemPartitions.includes(entitlementInfo.systempartition)
    ) {
      accountsBySystemPartition[entitlementInfo.systempartition].add(
        entitlementInfo.account,
      );
    }
  });

  Object.keys(accountsBySystemPartition).forEach((systempartition) => {
    if (accountType === "secondary") {
      accountsBySystemPartition[systempartition] = [
        ...accountsBySystemPartition[systempartition],
      ].filter((account) => account === prefered_username);
    } else {
      accountsBySystemPartition[systempartition] = [
        ...accountsBySystemPartition[systempartition],
      ];
    }
  });
  return accountsBySystemPartition;
}

function getUnicoreProjectsBySystemPartition() {
  const projectsBySystemPartition = {} as Record<string, Set<string>>;

  unicoreSystemPartitions.forEach((systempartition) => {
    projectsBySystemPartition[systempartition] = new Set();
  });

  entitlements.forEach((entitlement: string) => {
    const entitlementInfo = extractEntitlementsInfo(entitlement);

    if (
      entitlementInfo &&
      unicoreSystemPartitions.includes(entitlementInfo.systempartition)
    ) {
      if (
        accountType === "normal" ||
        entitlementInfo.account === prefered_username
      ) {
        projectsBySystemPartition[entitlementInfo.systempartition].add(
          entitlementInfo.project,
        );
      }
    }
  });

  Object.keys(projectsBySystemPartition).forEach(function (systempartition) {
    projectsBySystemPartition[systempartition] = [
      ...projectsBySystemPartition[systempartition],
    ];
  });

  return projectsBySystemPartition;
}

function getUnicorePartitions() {
  const partitions = new Set();

  unicoreSystemPartitions.forEach((partition) => {
    const partitionName = mapPartitions[partition.toLowerCase()];
    if (partitionName) {
      partitions.add(partitionName);
    }
  });

  Object.keys(defaultPartitions).forEach((partition) => {
    defaultPartitions[partition].forEach((defaultPartition: string) => {
      partitions.add(defaultPartition);
    });
  });

  if (accountType === "normal") {
    return [...partitions];
  }

  if (accountType === "secondary") {
    return [
      ...new Set(
        [...partitions].filter((partition) => {
          return entitlements
            .map(extractEntitlementsInfo)
            .filter(Boolean)
            .some(
              (tmp: EntitlementInfo) =>
                tmp.systempartition &&
                mapPartitions[tmp.systempartition.toLowerCase()] ===
                  partition &&
                tmp.account === prefered_username,
            );
        }),
      ),
    ];
  }

  return [];
}

function getUnicoreAccountsS(systems: string[]) {
  const accounts = new Set();

  systems.forEach((system) => {
    entitlements.forEach(function (entitlement: string) {
      const entitlementInfo = extractEntitlementsInfo(entitlement);
      if (
        entitlementInfo &&
        mapSystems[entitlementInfo.systempartition.toLowerCase()] === system
      ) {
        if (accountType === "normal") {
          accounts.add(entitlementInfo.account);
        } else if (accountType === "secondary") {
          if (entitlementInfo.account === prefered_username) {
            accounts.add(entitlementInfo.account);
          }
        }
      }
    });
  });

  return [...accounts];
}

function getUnicoreProjectsSA(systems: string[], accounts: string[]) {
  const projects = [];

  systems.forEach((system) => {
    accounts.forEach((account) => {
      entitlements.forEach(function (entitlement: string) {
        const entitlementInfo = extractEntitlementsInfo(entitlement);

        if (entitlementInfo) {
          const mappedSystem =
            mapSystems[entitlementInfo.systempartition.toLowerCase()];
          if (mappedSystem === system) {
            if (accountType === "normal") {
              if (entitlementInfo.account === account) {
                projects.push(entitlementInfo.project);
              }
            } else if (accountType === "secondary") {
              if (entitlementInfo.account === prefered_username) {
                if (entitlementInfo.account === account) {
                  projects.push(entitlementInfo.project);
                }
              }
            }
          }
        }
      });
    });
  });
  return [...new Set(projects)];
}

function getUnicoreProjectsS(systems: string[]) {
  const projects = [];

  systems.forEach((system) => {
    entitlements.forEach(function (entitlement: string) {
      const entitlementInfo = extractEntitlementsInfo(entitlement);

      if (entitlementInfo) {
        const mappedSystem =
          mapSystems[entitlementInfo.systempartition.toLowerCase()];
        if (mappedSystem === system) {
          projects.push(entitlementInfo.project);
        }
      }
    });
  });
  return [...new Set(projects)];
}

function getUnicorePartitionsSAP(
  systems: string[],
  accounts: string[] = [],
  projects: string[] = [],
) {
  const partitions = [];
  let interactivePartitions = [];
  let allPartitions = [];
  const systemConfig =
    useConfigStore.getState().frontendCollection.systemConfig || {};

  systems.forEach((system) => {
    accounts.forEach((account) => {
      projects.forEach((project) => {
        const allPartitions_ = new Set();

        let interactiveAdded = false;

        entitlements.forEach(function (entitlement: string) {
          const entitlementInfo = extractEntitlementsInfo(entitlement);
          if (
            entitlementInfo &&
            mapSystems[entitlementInfo.systempartition.toLowerCase()] ===
              system &&
            (entitlementInfo.project === project || project === "_all_")
          ) {
            if (accountType === "normal" || account === "_all_") {
              if (!interactiveAdded) {
                interactiveAdded = true;
                const interactivePartitions_ =
                  systemConfig[system]?.interactivePartitions || [];
                interactivePartitions = [
                  ...new Set([
                    ...interactivePartitions,
                    ...interactivePartitions_,
                  ]),
                ];
              }
              if (entitlementInfo.account === account || account === "_all_") {
                allPartitions_.add(
                  mapPartitions[entitlementInfo.systempartition.toLowerCase()],
                );
              }
            } else if (accountType === "secondary") {
              if (!interactiveAdded) {
                interactiveAdded = true;
                const interactivePartitions_ =
                  systemConfig[system]?.interactivePartitions || [];
                interactivePartitions = [
                  ...new Set([
                    ...interactivePartitions,
                    ...interactivePartitions_,
                  ]),
                ];
              }
              if (
                entitlementInfo.account === prefered_username &&
                entitlementInfo.account === account
              ) {
                allPartitions_.add(
                  mapPartitions[entitlementInfo.systempartition.toLowerCase()],
                );
              }
            }
          }
          allPartitions = [...new Set([...allPartitions, ...allPartitions_])];
        });

        Object.keys(defaultPartitions).forEach(function (systempartition) {
          const system_ = mapSystems[systempartition];
          if (system_ === system) {
            if (defaultPartitions[systempartition]) {
              if (allPartitions.includes(mapPartitions[systempartition])) {
                defaultPartitions[systempartition].forEach(
                  function (defaultPartition) {
                    allPartitions.push(
                      mapPartitions[defaultPartition.toLowerCase()],
                    );
                  },
                );
              }
            }
          }
        });
      });
    });
  });

  return [...new Set([...interactivePartitions, ...allPartitions])];
}

function getAllUnicoreReservations() {
  const localreservations = [];

  Object.keys(reservations).forEach((system) => {
    reservations[system].forEach((reservation) => {
      localreservations.push(reservation);
    });
  });

  return localreservations;
}

function getUnicoreReservationsS(systems: string[]) {
  const localreservations = [];
  systems.forEach((system) => {
    if (reservations[system]) {
      localreservations.push(
        reservations[system]
          .filter((reservation) => reservation)
          .map((reservation) => reservation),
      );
    }
  });
  return localreservations;
}

function getUnicoreReservationsSAPP(
  systems: string[],
  accounts: string[],
  projects: string[],
  partitions: string[],
) {
  const localreservations = [];
  const systemConfig =
    useConfigStore.getState().frontendCollection.systemConfig || {};

  systems.forEach((system) => {
    accounts.forEach((account) => {
      projects.forEach((project) => {
        partitions.forEach((partition) => {
          if (!reservations[system]) {
            return;
          }

          const isInteractivePartition =
            systemConfig[system] &&
            systemConfig[system].interactivePartitions.includes(partition);

          if (isInteractivePartition) {
            return;
          }

          localreservations.push(
            ...reservations[system].filter((reservation) => {
              const partitionMatches =
                reservation.PartitionName === "" ||
                reservation.PartitionName === partition ||
                partition === "_all_";
              const usersMatch =
                reservation.Users === "" ||
                reservation.Users.split(",").includes(account) ||
                account === "_all_";
              const accountsMatch =
                reservation.Accounts === "" ||
                reservation.Accounts === project ||
                project === "_all_";
              return partitionMatches && usersMatch && accountsMatch;
            }),
          );
        });
      });
    });
  });
  return [...new Set(localreservations)];
}

function getAccountOptions(
  system: string,
  serviceId: string,
  configId: string,
) {
  //console.log("getAccountOptions system ", system);
  const systems = Array.isArray(system) ? system : [system];
  //console.log("getAccountOptions systems ", systems);
  const accounts = getUnicoreAccountsS(systems);
  //console.log("getAccountOptions accounts ", accounts);
  if (accounts.includes(prefered_username)) {
    accounts.sort((account) => (account === prefered_username ? -1 : 1));
  }
  return accounts.map((item) => [item, item]);
}

function getProjectOptions(
  system: string,
  account: string,
  serviceId: string,
  configId: string,
) {
  const systems = Array.isArray(system) ? system : [system];
  let projects = [];
  if (account) {
    const accounts = Array.isArray(account) ? account : [account];
    projects = getUnicoreProjectsSA(systems, accounts);
  } else {
    projects = getUnicoreProjectsS(systems);
  }
  return projects.map((item) => [item, item]);
}

function getPartitionOptions(
  system: string,
  account: string = "_all_",
  project: string = "_all_",
  serviceId: string,
  configId: string,
) {
  const systems = Array.isArray(system) ? system : [system];
  const accounts = Array.isArray(account) ? account : [account];
  const projects = Array.isArray(project) ? project : [project];
  const partitions = getUnicorePartitionsSAP(systems, accounts, projects);
  return partitions.map((item) => [item, item]);
}

function getPartitionAndInteractivePartition(
  system: string,
  account: string = "_all_",
  project: string = "_all_",
  serviceId: string,
  configId: string,
) {
  const systems = Array.isArray(system) ? system : [system];
  let partitions = getPartitionOptions(
    system,
    account,
    project,
    serviceId,
    configId,
  );
  let interactivePartitionsLength = 0;
  const presetValues = false;
  //if (pageType(null) == pageType("workshop")) {
  //  presetValues = getWorkshopOptions()?.hpc?.partition || false;
  //}
  const interactivePartitionAdded = [];
  if (presetValues) {
    partitions = partitions.filter(([item, _]) => presetValues.includes(item));
  }
  partitions.forEach((partition) => {
    const partition_ = partition[0];
    systems.forEach((system) => {
      if (
        (systemConfig[system]?.interactivePartitions || []).includes(partition_)
      ) {
        if (!interactivePartitionAdded.includes(partition_)) {
          interactivePartitionsLength += 1;
          interactivePartitionAdded.push(partition_);
        }
      }
    });
  });
  return [partitions, interactivePartitionsLength];
}

export const createUnicoreSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  UnicoreSlice
> = (set) => ({
  unicore: {
    accountType: _getUnicoreAccountType(),
    prefered_username: window.getAuthState().preferred_username || "none",
    entitlements: Array.isArray(window.getAuthState().oauth_user.entitlements)
      ? window.getAuthState().oauth_user.entitlements
      : [window.getAuthState().oauth_user.entitlements],
    reservations:
      useConfigStore.getState().frontendCollection.reservations || {},
    mapSystems: useConfigStore.getState().frontendCollection.mapSystems || {},
    mapPartitions:
      useConfigStore.getState().frontendCollection.mapPartitions || {},
    defaultPartitions:
      useConfigStore.getState().frontendCollection.defaultPartitions || {},
    systemPartitions: _getUnicoreSystemPartitions(),
    systems: _getUnicoreSystems(),
    accountsBySystemPartition: _getAllUnicoreAccountsBySystemPartition(),
    projectsBySystemPartition: getUnicoreProjectsBySystemPartition(),
    partitions: getUnicorePartitions(),
  },
  setUnicore: (unicore: Unicore) => set({ unicore }),
  getUnicoreAccountsS,
  getUnicoreProjectsSA,
  getUnicoreProjectsS,
  getUnicorePartitionsSAP,
  getUnicoreReservationsSAPP,
  getAccountOptions,
  getProjectOptions,
  getPartitionAndInteractivePartition,
});
