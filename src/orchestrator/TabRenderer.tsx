import React from "react";
import { FieldOrchestrator } from "./FieldOrchestrator";
import type { TabConfig, FieldConfig } from "@/types/frontendConfig";

export interface TabRendererProps {
  tabConfig: TabConfig;
  serviceId: string;
  tabId: string;
  rowId?: string;
}

export const TabRenderer = ({
  tabConfig,
  serviceId,
  tabId,
  rowId = "",
}: TabRendererProps) => {
  return (
    <>
      {Object.entries(tabConfig).map(([section, fields]) => (
        <div key={section} className={`tab-section tab-section--${section}`}>
          {Object.entries(fields as Record<string, FieldConfig>).map(
            ([fieldName, fieldConfig]) => (
              <FieldOrchestrator
                key={fieldName}
                fieldName={fieldName}
                config={fieldConfig}
                serviceId={serviceId}
                tabId={tabId}
                rowId={rowId}
              />
            ),
          )}
        </div>
      ))}
    </>
  );
};
