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

// TODO : Use dependencies instead of test options
// TODO : Refactor inline styles to CSS or styled-components
const JupyterLabConfig = () => {
  const configIndex = useContext(JupyterlabIDContext);
  const config = useConfigByIndex(configIndex);
  const updateConfig = useUpdateConfig();

  const handleUpdateConfigName = (newName: string) => {
    updateConfig(config.id, { name: newName });
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
          defaultValue={config?.name}
          value={config?.name}
          onChange={(e) => handleUpdateConfigName(e.target.value)}
        />
      </div>
      <SelectRow
        id="version"
        label="Version"
        options={[
          { value: "jupyterlab-4-3", label: "JupyterLab - 4.3" },
          { value: "jupyterlab-4-2", label: "JupyterLab - 4.2" },
          { value: "jupyterlab-3-6", label: "JupyterLab - 3.6" },
          { value: "repo2docker-binder", label: "Repo2Docker (binder)" },
          { value: "xpra-remote-desktop", label: "Xpra (Remote Desktop)" },
          { value: "custom-docker-image", label: "Custom Docker Image" },
        ]}
        defaultValue={config?.profile}
      />
      <SelectRow
        id="system"
        label="System"
        options={[
          { value: "juwels", label: "Juwels" },
          { value: "jureca", label: "Jureca" },
          { value: "jupyter", label: "Jupyter" },
          { value: "jusuf", label: "Jusuf" },
          { value: "JSC-Cloud", label: "JSC-Cloud" },
        ]}
        defaultValue={config?.system}
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
