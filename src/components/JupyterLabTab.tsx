import React from "react";
import { Tabs } from "radix-ui";
import JupyterLabConfig from "./JupyterLabConfig";
import StorageTab from "./Storage/storageTab";
import EnvironmentTab from "./Environment/EnvironmentTab";
import ResourcesTab from "./Resources/ResourcesTab";
import ExtensionsTab from "./KernelsExtensions/ExtensionsTab";
import LogTab from "./Logs/LogTab";
import { JupyterlabIDContext } from "../stores";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Add proper content to each tab 4/6

interface JupyterLabTabProps {
  configIndex: number;
}

const JupyterLabTab = ({ configIndex }: JupyterLabTabProps) => {
  return (
    <Tabs.Root defaultValue="lab" style={{ display: "flex" }}>
      <Tabs.List
        style={{ display: "flex", flexDirection: "column", width: "384px" }}
      >
        <Tabs.Trigger value="lab">Lab Config</Tabs.Trigger>
        <Tabs.Trigger value="storage">Storage</Tabs.Trigger>
        <Tabs.Trigger value="environment">Environment Variables</Tabs.Trigger>
        <Tabs.Trigger value="extensions">Kernels and Extensions</Tabs.Trigger>
        <Tabs.Trigger value="resources">Ressources</Tabs.Trigger>
        <Tabs.Trigger value="logs">Logs</Tabs.Trigger>
      </Tabs.List>
      <JupyterlabIDContext value={configIndex}>
        <Tabs.Content value="lab" style={{ width: "100%" }}>
          <JupyterLabConfig />
        </Tabs.Content>
        <Tabs.Content value="storage" style={{ width: "100%" }}>
          <StorageTab />
        </Tabs.Content>
        <Tabs.Content value="environment" style={{ width: "100%" }}>
          <EnvironmentTab />
        </Tabs.Content>
        <Tabs.Content value="resources" style={{ width: "100%" }}>
          <ResourcesTab />
        </Tabs.Content>
        <Tabs.Content value="extensions" style={{ width: "100%" }}>
          <ExtensionsTab />
        </Tabs.Content>
        <Tabs.Content value="logs" style={{ width: "100%" }}>
          <LogTab />
        </Tabs.Content>
      </JupyterlabIDContext>
    </Tabs.Root>
  );
};

export default JupyterLabTab;
