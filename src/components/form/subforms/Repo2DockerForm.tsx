import { useState } from "react";
import { withForm } from "@/hooks/formContext";
import { defaultFormValues, REPOPATHTYPE, REPOTYPE } from "@/components/form/shared";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

export const Repo2DockerForm = withForm({
  defaultValues: defaultFormValues,
  props: {
    system: "",
    flavor: "",
    configId: "",
  },
  render: function Render({ form }) {
    const [repoTypeOptions, setRepoTypeOptions] = useState<Option>({
      options: {},
    });
    const [repoPathTypeOptions, setRepoPathTypeOptions] = useState<Option>({
      options: {},
    });
    return (
      <>
        <form.AppField
          name="repo2docker.repo2dockerdirectlink"
          validators={{
            onChangeListenTo: [
              "storage.localstoragepath",
              "repo2docker.repopathtype",
              "repo2docker.repotype",
            ], // homeTriggerUpdateDirectLinks
            onChange: ({ value }) => {
              console.log(`Repo2Docker Direct Link changed to: ${value}`);
              // triggerRegistry.useTrigger("homeTriggerUpdateDirectLinks");
            },
          }}
        >
          {(field) => (
            <field.text label="Repo2Docker Direct Link" copy={true} />
          )}
        </form.AppField>
        <form.AppField
          name="repo2docker.repotype"
          listeners={{
            onMount: () => {
              setRepoTypeOptions({
                options: Object.fromEntries(
                  REPOTYPE.map((r) => [r.value, r.label]),
                ),
              });
            },
          }}
          // triggerOnChange: "homeTriggerRepoTypeChanged"
        >
          {(field) => (
            <field.select label="Repo Type" options={repoTypeOptions} />
          )}
        </form.AppField>
        <form.AppField
          name="repo2docker.repourl"
          validators={{
            onChangeListenTo: ["repo2docker.repotype"], // homeTriggerRepoUrl
            onChange: ({ value }) => {
              console.log(`Repo URL changed to: ${value}`);
              // triggerRegistry.useTrigger("homeTriggerRepoUrl");
            },
          }} //onInputChange: "repoUrlChanged"
        >
          {(field) => <field.text label="Repo URL" required={true} />}
        </form.AppField>
        <form.AppField name="repo2docker.reporef">
          {(field) => <field.text label="Repo Ref" />}
        </form.AppField>
        <form.AppField name="repo2docker.repopath">
          {(field) => <field.text label="Repo Path" />}
        </form.AppField>
        <form.AppField
          name="repo2docker.repopathtype"
          validators={{
            onChangeListenTo: ["repo2docker.repopath"], // privaterepo : toggleexternalCB
            onChange: ({ value }) => {
              console.log(`Repo Path Type changed to: ${value}`);
              // triggerRegistry.useTrigger("homeTriggerRepoPathType");
            },
          }}
          listeners={{
            onMount: () => {
              setRepoPathTypeOptions({
                options: Object.fromEntries(
                  REPOPATHTYPE.map((r) => [r.value, r.label]),
                ),
              });
            },
          }}
        >
          {(field) => (
            <field.select
              label="Repo Path Type"
              options={repoPathTypeOptions}
            />
          )}
        </form.AppField>
        <form.AppField name="storage.localstoragepath">
          {(field) => <field.text label="Mount user data" />}
        </form.AppField>
      </>
    );
  },
});
