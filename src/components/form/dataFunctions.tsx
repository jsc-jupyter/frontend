import { useCombinedStore } from "@/stores/combinedStore";
import {
  getServiceConfig,
  getModulesConfig,
} from "@/utils/frontendCollectionHelper";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

const homeTriggerOption = () => {
  const ret: Option = {
    options: {},
  };

  let values = getServiceConfig().JupyterLab.options;
  const getAllSystems = useCombinedStore.getState().getAllSystems;
  //const workshopValues = getWorkshopOptions();
  //const isWorkshop = !isEmptyObject(workshopValues);
  /*if (isWorkshop) {
      let allowedSystems = workshopValues?.system || false;
      if ( allowedSystems ) {
        if ( !Array.isArray(allowedSystems) ){
          allowedSystems = [allowedSystems];
        }
        let allowedOptions = {};
        for ( const [key, valueInformation] of Object.entries(values) ) {
          allowedSystems.forEach(system => {
            const systemsPerOption = getServiceConfig(serviceId)?.options?.[key]?.allowedLists?.systems ?? [];
            if ( systemsPerOption.includes(system) && !allowedOptions.hasOwnProperty(key) ) {
              allowedOptions[key] = valueInformation;
            }
          });
        }
        values = allowedOptions;
      }
    } else {*/

  let allowedSystems = getAllSystems();
  if (!Array.isArray(allowedSystems)) {
    allowedSystems = [allowedSystems];
  }
  const allowedOptions = {};
  for (const [key, valueInformation] of Object.entries(values)) {
    allowedSystems.forEach((system) => {
      const systemsPerOption =
        getServiceConfig().JupyterLab?.options?.[key]?.allowedLists?.systems ??
        [];
      if (
        systemsPerOption.includes(system) &&
        !Object.prototype.hasOwnProperty.call(allowedOptions, key)
      ) {
        allowedOptions[key] = valueInformation;
      }
    });
  }
  values = allowedOptions;
  //}

  //const optionInput = $(`#${serviceId}-${rowId}-${tabId}-option-input`);
  let _values = Object.entries(values).map(([key, value]) => [key, value.name]);
  if (_values.length == 0) {
    _values = [["none", "No Option available. Please contact support"]];
  }
  ret.options = Object.fromEntries(_values);
  return ret;
};

const homeTriggerSystem = (
  option: string | string[],
  configId: string,
  serviceId: string,
) => {
  const ret: Option = {
    options: {},
  };
  const options = Array.isArray(option) ? option : [option];
  const serviceConfig = getServiceConfig();
  const getavailableSystemOptions =
    useCombinedStore.getState().getAvailableSystems;
  const getmissingSystemOptions =
    useCombinedStore.getState().getMissingSystemOptions;

  //  if ( optionInput.prop("disabled") ){
  //    // If option is disabled -> make all systems available
  //    fillSelect(elementId, systemInput, _getAllSystems().map(item => [item, item]));
  //  } else {
  // Update available systems
  let inactiveText = "N/A";
  const displayNames = Array<string>();
  options.forEach((option) => {
    if (
      serviceConfig["JupyterLab"]?.options &&
      Object.keys(serviceConfig["JupyterLab"]?.options).includes(option)
    ) {
      displayNames.push(serviceConfig["JupyterLab"].options[option].name);
    }
  });
  const displayName = displayNames.join(", ");
  inactiveText = `N/A for ${displayName}`;
  const values = getavailableSystemOptions(serviceId, options);
  const inactiveValues = getmissingSystemOptions(serviceId, configId, options);
  ret.options = Object.fromEntries(values);
  ret.inactiveOptions = Object.fromEntries(inactiveValues);
  ret.inactiveText = inactiveText;
  return ret;
  //fillSelect(elementId, systemInput, getAvailableSystemOptions(serviceId, options), {}, getMissingSystemOptions(serviceId, rowId, options), inactiveText);
  //}
};

const homeTriggerAccount = (
  system: string,
  configId: string,
  serviceId: string,
) => {
  const ret: Option = {
    options: {},
  };
  const getAccountOptions = useCombinedStore.getState().getAccountOptions;
  ret.options = Object.fromEntries(
    getAccountOptions(system, serviceId, configId),
  );
  return ret;
};

const homeTriggerProject = (
  system: string,
  account: string,
  configId: string,
  serviceId: string,
) => {
  const ret: Option = {
    options: {},
  };
  const values = useCombinedStore
    .getState()
    .getProjectOptions(system, account, serviceId, configId);
  ret.options = Object.fromEntries(values);
  return ret;
  //const inputElement = getInputElement(serviceId, rowId, "project");
  //fillSelect(elementId, inputElement, values);
};

const homeTriggerPartition = (
  system: string,
  account: string,
  project: string,
  configId: string,
  serviceId: string,
) => {
  const ret: Option = {
    options: {},
  };
  const [partitions, interactivePartitionsLength] = useCombinedStore
    .getState()
    .getPartitionAndInteractivePartition(
      system,
      account,
      project,
      serviceId,
      configId,
    );
  ret.options = Object.fromEntries(partitions);
  ret.groups = {
    "Login Nodes": interactivePartitionsLength,
    "Compute Nodes": partitions.length - interactivePartitionsLength,
  };
  console.log("homeTriggerPartition partitions ", ret);
  return ret;
  //const inputElement = getInputElement(serviceId, rowId, "partition");
  //fillSelect(elementId, inputElement, partitions, {"Login Nodes": interactivePartitionsLength, "Compute Nodes": -1});
};

const homeTriggerReservation = (configId: string, serviceId: string) => {
  const ret: Option = {
    options: {},
  };
  return ret;
  // TODO: Fetch reservations for selected partition
  // SKIP FOR NOW
};

const homeTriggerFlavor = (system: string): Option => {
  const ret: Option = {
    options: {},
  };
  const kubeFlavorSystems = useCombinedStore.getState().kubeFlavorSystems;
  const getAvailableKubeFlavorsS =
    useCombinedStore.getState().getAvailableKubeFlavorsS;
  const getUnavailableKubeFlavorsS =
    useCombinedStore.getState().getUnavailableKubeFlavorsS;
  if (kubeFlavorSystems.includes(system)) {
    let availableFlavors = getAvailableKubeFlavorsS([system]);
    const unavailableFlavors = getUnavailableKubeFlavorsS([system]);
    if (availableFlavors.length == 0) {
      availableFlavors = [
        [
          "_undefined",
          "Couldn't receive flavors. Please re-login to use this system",
        ],
      ];
    }

    /*const selectInput = getInputElement(serviceId, rowId, "flavor");
    fillSelect(
      elementId,
      selectInput,
      availableFlavors,
      {},
      unavailableFlavors,
      "maximum reached",
    );*/
    ret.options = Object.fromEntries(availableFlavors);
    if (unavailableFlavors.length > 0) {
      ret.inactiveOptions = Object.fromEntries(unavailableFlavors);
      ret.inactiveText = "maximum reached";
    }
    return ret;
  }
  return ret;
};

type ModuleConfig = {
  id: string;
  displayname: string;
  default: boolean;
  link: string;
  weight: number;
  versions: false | string[];
};

const getModuleValues = (
  options: string | string[],
  systems: string | string[],
  serviceId: string,
  name: string,
  setName: string,
) => {
  const values: ModuleConfig[] = [];
  const serviceConfig = getServiceConfig();
  const userModulesConfig = getModulesConfig();
  const keys = new Set();
  for (const system of systems) {
    for (const option of options) {
      if (serviceConfig?.[serviceId]?.options?.[option]?.[setName]) {
        const nameSet = serviceConfig[serviceId].options[option][setName];
        Object.entries(userModulesConfig[name])
          .filter(
            ([key, value]) =>
              value.sets &&
              value.sets.includes(nameSet) &&
              (!value.allowed_systems ||
                value.allowed_systems.includes(system)),
          )
          .forEach(([key, value]) => {
            if (!keys.has(key)) {
              keys.add(key);
              values.push({
                id: key,
                displayname: value.displayName,
                default:
                  typeof value.default === "object" && value.default !== null
                    ? value.default.default
                    : value.default,
                link: value.href,
                weight: value.weight ?? 10,
                versions: value.options || false,
              });
            }
          });
      }
    }
  }
  return values.sort((a, b) => b.weight - a.weight);
};

export {
  homeTriggerOption,
  homeTriggerSystem,
  homeTriggerAccount,
  homeTriggerProject,
  homeTriggerPartition,
  homeTriggerReservation,
  homeTriggerFlavor,
  getModuleValues,
};
