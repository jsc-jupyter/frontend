import React from "react";
import { Tabs } from "radix-ui";
import { JupyterlabIDContext } from "../stores";
import { getFrontendConfig } from "@/utils/frontendConfigHelper";
import { TabRenderer } from "@/orchestrator";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Add proper content to each tab 4/6

interface JupyterLabTabProps {
  configId: string;
}

const JupyterLabTab = ({ configId }: JupyterLabTabProps) => {
  const frontendConfig = getFrontendConfig();
  const tabs =
    frontendConfig.services.options[frontendConfig.services.default].tabs;
  return (
    <Tabs.Root defaultValue="lab" style={{ display: "flex" }}>
      <Tabs.List
        style={{ display: "flex", flexDirection: "column", width: "384px" }}
      >
        {Object.entries(tabs).map(([tabKey, _tabConfig]) => (
          <Tabs.Trigger key={tabKey} value={tabKey}>
            {tabKey}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <JupyterlabIDContext value={configId}>
        {Object.entries(tabs).map(([tabKey, tabConfig]) => (
          <Tabs.Content key={tabKey} value={tabKey} style={{ width: "100%" }}>
            <TabRenderer
              tabConfig={tabConfig}
              serviceId={frontendConfig.services.default}
              tabId={tabKey}
            />
          </Tabs.Content>
        ))}
      </JupyterlabIDContext>
    </Tabs.Root>
  );
};

export default JupyterLabTab;
