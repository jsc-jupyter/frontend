import React, { useContext } from "react";
import { Label, Separator } from "radix-ui";
import SelectRow from "./SelectRow";
import AccountOptions from "./AccountOptions";
import Repoflavor from "./RepoFlavor";
import DockerFlavor from "./DockerFlavor";
import SimpleFlavor from "./SimpleFlavor";
import {
  JupyterlabIDContext,
  useUpdateConfig,
  useConfigByIndex,
} from "../stores";
import {
  getServiceConfig,
  getSystemConfig,
} from "@/utils/frontendCollectionHelper";

// TODO : Use dependencies instead of test options
// TODO : Refactor inline styles to CSS or styled-components
const JupyterLabConfig = () => {
  const configIndex = useContext(JupyterlabIDContext);
  const config = useConfigByIndex(configIndex);
  const serviceConfig = getServiceConfig();
  const systemConfig = getSystemConfig();
  const updateConfig = useUpdateConfig();
  const handleUpdateConfigName = (newName: string) => {
    updateConfig(config.id, { name: newName });
  };

  const handleUpdateConfigProfile = (newProfile: string) => {
    updateConfig(config.id, { profile: newProfile, option: newProfile });
  };

  const handleUpdateConfigSystem = (newSystem: string) => {
    updateConfig(config.id, { system: newSystem });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 10px",
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="name">
          Name
        </Label.Root>
        <input
          className="Input"
          type="text"
          id="name"
          defaultValue={config.name}
          value={config.name}
          onChange={(e) => handleUpdateConfigName(e.target.value)}
        />
      </div>
      <SelectRow
        id="version"
        label="Version"
        options={Object.entries(serviceConfig.JupyterLab.options).map(
          ([key, value]) => ({
            value: key,
            label: value.name,
          }),
        )}
        defaultValue={config.profile}
        onChange={(e) => handleUpdateConfigProfile(e)}
      />
      <SelectRow
        id="system"
        label="System"
        options={Object.entries(systemConfig).map(([key, _value]) => ({
          value: key,
          label: key,
        }))}
        defaultValue={config.system}
        onChange={(e) => handleUpdateConfigSystem(e)}
      />
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
      {config?.system !== "jsc-cloud" && <AccountOptions />}
      {config?.system === "jsc-cloud" &&
        config?.profile === "repo2docker-binder" && <Repoflavor />}
      {config?.system === "jsc-cloud" &&
        config?.profile === "custom-docker-image" && <DockerFlavor />}
      {(config?.profile === "jupyterlab-4-3" ||
        config?.profile === "jupyterlab-4-2" ||
        config?.profile === "jupyterlab-3-6") && <SimpleFlavor />}
    </div>
  );
};

export default JupyterLabConfig;
