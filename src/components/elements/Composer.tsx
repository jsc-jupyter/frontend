import React from "react";
import { TabRenderer } from "@/orchestrator/TabRenderer";
import type { TabConfig } from "@/types/frontendConfig";

interface ComposerProps {
  tabConfig: TabConfig;
  serviceId: string;
  tabId: string;
  rowId?: string;
}

const Composer: React.FC<ComposerProps> = ({
  tabConfig,
  serviceId,
  tabId,
  rowId = "",
}) => {
  return (
    <TabRenderer
      tabConfig={tabConfig}
      serviceId={serviceId}
      tabId={tabId}
      rowId={rowId}
    />
  );
};

export default Composer;
