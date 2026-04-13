import { useState } from "react";
import { useConfigStore } from "@/stores";
import {
  homeTriggerOption,
  homeTriggerSystem,
  homeTriggerFlavor,
} from "../dataFunctions";
import { withForm } from "@/hooks/formContext";
import { HPCForm } from "./HPCForm";
import { Repo2DockerForm } from "./Repo2DockerForm";
import { CustomDockerForm } from "./CustomDockerForm";
import FlavorInfo from "../../FlavorInfo/FlavorInfo";
import FlavorLegend from "../../FlavorLegend/FlavorLegend";
import { getBackendServices, getSystemConfig } from "@/utils/frontendCollectionHelper";
import { defaultFormValues } from "../shared";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

export const HomeForm = withForm({
  defaultValues: defaultFormValues,
  props: {
    configId: "",
    userOptions: undefined,
    configOptions: undefined,
  },
  render: function Render({ form, configId }) {
    const systemConfig = getSystemConfig();
    const backendServicesConfig = getBackendServices();
    const [optionOptions, setOptionOptions] = useState<Option>({ options: {} });
    const [systemOptions, setSystemOptions] = useState<Option>({ options: {} });
    const [flavorOptions, setFlavorOptions] = useState<Option>({ options: {} });

    const getSystemType = (system: string) => {
      const backendService = systemConfig[system].backendService;
      const ret = backendServicesConfig[backendService]?.mapping ?? system;
      console.log("getSystemType result: ", ret);
      return ret;
    };

    return (
      <>
        <form.AppField name="name">
          {(field) => <field.text label="Name" />}
        </form.AppField>
        <form.AppField
          name="option"
          listeners={{
            onMount: () => {
              const options = homeTriggerOption();
              console.log("homeTriggerOption onMount result: ", options);
              setOptionOptions(options ?? []);
            },
          }}
        >
          {(field) => <field.select label="Option" options={optionOptions} />}
        </form.AppField>
        <form.AppField
          name="system"
          validators={{
            onChangeListenTo: ["option"],
            onChange: ({ fieldApi }) => {
              const option = fieldApi.form.getFieldValue("option");
              const options = homeTriggerSystem(option, configId, "jupyterlab");
              console.log("homeTriggerSystem onMount result: ", options);
              setSystemOptions(options ?? []);
            },
          }}
          listeners={{
            onMount: ({ value }) => {
              console.log(`System field mounted with value: ${value}`);
              const options = homeTriggerSystem(value, configId, "jupyterlab");
              console.log("homeTriggerSystem onMount result: ", options);
              setSystemOptions(options ?? []);
            },
          }}
        >
          {(field) => <field.select label="System" options={systemOptions} />}
        </form.AppField>
        <form.Subscribe selector={(state) => state.values.system}>
          {(system) => (
            <>
              {getSystemType(system) === "unicore" && (
                <>
                  <HPCForm form={form} configId={configId} system={system} />
                </>
              )}
            </>
          )}
        </form.Subscribe>
        <form.Subscribe selector={(state) => state.values.option}>
          {(option) => (
            <>
              {option === "custom" && (
                <>
                  <CustomDockerForm
                    form={form}
                    configId={configId}
                    system={form.getFieldValue("system")}
                  />
                </>
              )}
            </>
          )}
        </form.Subscribe>
        <form.Subscribe selector={(state) => state.values.option}>
          {(option) => (
            <>
              {option === "repo2docker" && (
                <>
                  <Repo2DockerForm
                    form={form}
                    configId={configId}
                    system={form.getFieldValue("system")}
                  />
                </>
              )}
            </>
          )}
        </form.Subscribe>
        <form.Subscribe selector={(state) => state.values.system}>
          {(system) => (
            <>
              {getSystemType(system) !== "unicore" && (
                <>
                  <form.AppField
                    name="flavor"
                    validators={{
                      onChangeListenTo: ["system"], // homeTriggerFlavor
                      onChange: ({ fieldApi }) => {
                        const system = fieldApi.form.getFieldValue("system");
                        const options = homeTriggerFlavor(system);
                        setFlavorOptions(options ?? []);
                      },
                    }}
                    listeners={{
                      onMount: ({ fieldApi }) => {
                        const system = fieldApi.form.getFieldValue("system");
                        const options = homeTriggerFlavor(system);
                        console.log(
                          "homeTriggerFlavor onMount result: ",
                          options,
                        );
                        setFlavorOptions(options ?? []);
                      },
                    }}
                  >
                    {(field) => (
                      <field.select label="Flavor" options={flavorOptions} />
                    )}
                  </form.AppField>
                  <FlavorLegend />
                  <FlavorInfo
                    system={system}
                    flavor={form.getFieldValue("flavor")}
                  />
                </>
              )}
            </>
          )}
        </form.Subscribe>

        <form.AppForm>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("All Values: ", form.state.values);
            }}
          >
            Debug
          </button>
        </form.AppForm>
      </>
    );
  },
});
