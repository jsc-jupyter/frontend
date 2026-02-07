import React, { JSX, useContext } from "react";
import { Checkbox, Label, Separator } from "radix-ui";
import { CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  JupyterlabIDContext,
  useConfigByIndex,
  useAddModule,
  useDeleteModule,
} from "@/stores";
import {
  getConfigModules,
  getServiceConfig,
  getUserModules,
} from "@/utils/frontendCollectionHelper";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Implement
// TODO : Extract components/styles where applicable

function createCheckboxes(
  section: string,
  items: any[],
  config: any,
  onChange: (
    checked: Checkbox.CheckedState,
    id: string,
    section: string,
  ) => void,
): JSX.Element[] {
  return Object.entries(items).map(([name, item]) => {
    const sectionKey = section.toLowerCase();
    const isChecked = config?.[sectionKey]?.some((m: any) => m.name === name) || false;
    
    return (
      <div
        key={item.name}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <Checkbox.Root
          checked={isChecked}
          defaultChecked={item.default}
          onCheckedChange={(checked) => onChange(checked, name, section)}
          id={item.name}
          style={{
            width: "16px",
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Label.Root htmlFor={item.name}>{item.displayName}</Label.Root>
        <InfoCircledIcon href={item.href} />
      </div>
    );
  });
}

const ModuleTab = () => {
  const configIndex = useContext(JupyterlabIDContext);
  const config = useConfigByIndex(configIndex);
  const [service, option, system] = config
    ? [config.service, config.option, config.system]
    : ["", "", ""];
  const moduleMap = getConfigModules();
  const modules = getUserModules(config.id);
  const serviceConfig = getServiceConfig();
  console.log(serviceConfig.JupyterLab.options[option]);
  const addModule = useAddModule();
  const deleteModule = useDeleteModule();
  const onCheckboxChange = (
    checked: Checkbox.CheckedState,
    module: string,
    section: string,
  ) => {
    if (checked === true) {
      console.log("Adding module:", module, "to section:", section);
      handleAddModule(module, section);
    } else if (checked === false) {
      console.log("Deleting module:", module, "from section:", section);
      handleDeleteModule(module, section);
    }
  };

  const handleAddModule = (module: string, moduleType: string) => {
    if (!config) return;
    addModule(config.id, { name: module }, moduleType.toLocaleLowerCase());
  };

  const handleDeleteModule = (module: string, moduleType: string) => {
    if (!config) return;
    deleteModule(config.id, module, moduleType.toLocaleLowerCase());
  };
  return (
    <div>
      {Object.entries(moduleMap).map(([section, modules]) => (
        <div key={section}>
          <h3>{section}</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {createCheckboxes(section, modules, config, onCheckboxChange)}
          </div>
          {section == "communities" && (
            <Separator.Root
              style={{
                width: "100%",
                height: "2px",
                background: "#ff0303",
                margin: "15px 0",
              }}
            />
          )}
        </div>
      ))}
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input type="checkbox" checked={false} />
        <span>Select all</span>
        <input type="checkbox" checked={false} />
        <span>Deselect all</span>
      </div>
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
    </div>
  );
};

export default ModuleTab;
