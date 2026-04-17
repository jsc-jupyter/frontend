import React from "react";
import { Collapsible } from "radix-ui";
import JupyterLabTab from "./JupyterLabTab";
import { formSchema, FormType } from "./form/shared";
import { useAppForm } from "@/hooks/formContext";
import { buildHumanReadableQuery } from "@/utils/APIUtils";
import { useStore } from "@tanstack/react-form";
import { getUserOption } from "@/utils/frontendCollectionHelper";

// TODO : Add animations to the collapsible row
// TODO : Refactor inline styles to CSS or styled-components

interface JupyterlabCollapsibleRowProps {
  configId: string;
}

const JupyterlabCollapsibleRow = ({
  configId,
}: JupyterlabCollapsibleRowProps) => {
  const userOptions = getUserOption(configId);

  let envArray: { name: string; value: string }[] = [];
  envArray = Object.entries(userOptions?.envvariables ?? {}).map(
    ([name, value]) => ({ name, value }),
  );

  // Storage is datamount-1, datamount-2, ...
  // Map datamount element_id to vendor
  const storageArray = Object.entries(userOptions ?? {})
    .filter(([key, _]) => key.startsWith("datamount-"))
    .map(([_, value]) => ({
      ...value,
      vendor: value.element_id,
      relativemountpath: value.path,
      readonly: value.readonly === "readonly" || value.readonly === true,
    }));

  const mergedOptions = {
    ...userOptions,
    envvariables: envArray as FormType["envvariables"],
    storage: {
      mounts: storageArray,
      localstorage: userOptions.storage?.localstoragepath ?? "",
    },
  };
  console.log("Merged options for form initialization: ", mergedOptions);
  const parsed = formSchema.parse(mergedOptions);
  console.log("Parsed form values: ", parsed);
  // Initialize form with default values and schema
  const form = useAppForm({
    defaultValues: parsed,
    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value, meta }) => {
      switch (meta) {
        case "url":
          console.log("Generated URL Query: ", buildHumanReadableQuery(value));
          break;
        case "reset":
          form.reset();
          break;
        default:
          // Handle other submit triggers if necessary
          break;
      }
    },
  });
  const name = useStore(form.store, (state) => state.values.name);
  const system = useStore(form.store, (state) => state.values.system);
  const service = useStore(form.store, (state) => state.values.option);
  return (
    <Collapsible.Root asChild>
      <tbody style={{ backgroundColor: "darkgray" }}>
        <Collapsible.Trigger asChild>
          <tr style={{ WebkitAppearance: "unset" }}>
            <td />
            <td> {name} </td>
            <td> {system} </td>
            <td> {service} </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Stop clicked");
                }}
              >
                Stop
              </button>
              <button>Delete</button>
            </td>
          </tr>
        </Collapsible.Trigger>
        <Collapsible.Content asChild>
          <tr>
            <td colSpan={5}>
              <JupyterLabTab form={form} configId={configId} />
            </td>
          </tr>
        </Collapsible.Content>
      </tbody>
    </Collapsible.Root>
  );
};

export default JupyterlabCollapsibleRow;
