import { useState } from "react";
import {
  homeTriggerAccount,
  homeTriggerPartition,
  homeTriggerProject,
  homeTriggerReservation,
} from "../dataFunctions";
import { withForm } from "@/hooks/formContext";
import { defaultFormValues } from "../shared";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

export const HPCForm = withForm({
  defaultValues: defaultFormValues,
  props: {
    configId: "",
  },
  render: function Render({ form, configId }) {
    const [accountOptions, setAccountOptions] = useState<Option>({
      options: {},
    });
    const [partitionOptions, setPartitionOptions] = useState<Option>({
      options: {},
    });
    const [projectOptions, setProjectOptions] = useState<Option>({
      options: {},
    });
    const [reservationOptions, setReservationOptions] = useState<Option>({
      options: {},
    });
    return (
      <>
        <form.AppField
          name="hpc.account"
          validators={{
            onChange: ({ value }) => {
              console.log(`HPC Account changed to: ${value}`);
              const system = form.getFieldValue("system");
              const options = homeTriggerAccount(
                system,
                configId,
                "jupyterlab",
              );
              console.log("homeTriggerAccount onChange result: ", options);
              setAccountOptions(options ?? []);
            },
          }}
          listeners={{
            onChange: ({ value }) => {
              console.log(`HPC Account changed to: ${value}`);
              const system = form.getFieldValue("system");

              const options = homeTriggerAccount(
                system,
                configId,
                "jupyterlab",
              );
              console.log("homeTriggerAccount onChange result: ", options);
              setAccountOptions(options ?? []);
            },
            onMount: () => {
              const system = form.getFieldValue("system");
              const options = homeTriggerAccount(
                system,
                configId,
                "jupyterlab",
              );
              setAccountOptions(options ?? []);
            },
          }}
        >
          {(field) => (
            <field.select label="HPC Account" options={accountOptions} />
          )}
        </form.AppField>
        <form.AppField
          name="hpc.partition"
          validators={{
            onChangeListenTo: ["hpc.account", "hpc.project", "system"], // homeTriggerPartition
            onChange: ({ fieldApi }) => {
              const account = fieldApi.form.getFieldValue("hpc.account");
              const project = fieldApi.form.getFieldValue("hpc.project");
              const system = fieldApi.form.getFieldValue("system");
              const options = homeTriggerPartition(
                system,
                account,
                project,
                configId,
                "jupyterlab",
              );
              setPartitionOptions(options ?? []);
            },
          }}
          listeners={{
            onMount: ({ fieldApi }) => {
              const system = fieldApi.form.getFieldValue("system");
              const account = fieldApi.form.getFieldValue("hpc.account");
              const project = fieldApi.form.getFieldValue("hpc.project");
              const options = homeTriggerPartition(
                system,
                account,
                project,
                configId,
                "jupyterlab",
              );
              console.log("homeTriggerPartition onMount result: ", options);
              setPartitionOptions(options ?? []);
            },
          }}
        >
          {(field) => (
            <field.select label="HPC Partition" options={partitionOptions} />
          )}
        </form.AppField>
        <form.AppField
          name="hpc.project"
          validators={{
            onChangeListenTo: ["hpc.account"], // homeTriggerProject
            onChange: ({ value, fieldApi }) => {
              const system = fieldApi.form.getFieldValue("system");
              const account = fieldApi.form.getFieldValue("hpc.account");
              console.log(`HPC Project changed to: ${value}`);
              const options = homeTriggerProject(
                system,
                account,
                configId,
                "jupyterlab",
              );
              setProjectOptions(options ?? []);
            },
          }}
          listeners={{
            onMount: ({ fieldApi }) => {
              const system = fieldApi.form.getFieldValue("system");
              const account = fieldApi.form.getFieldValue("hpc.account");
              const options = homeTriggerProject(
                system,
                account,
                configId,
                "jupyterlab",
              );
              console.log("homeTriggerProject onMount result: ", options);
              setProjectOptions(options ?? []);
            },
          }}
        >
          {(field) => (
            <field.select label="HPC Project" options={projectOptions} />
          )}
        </form.AppField>
        <form.AppField
          name="hpc.reservation"
          validators={{
            onChangeListenTo: ["hpc.account", "hpc.partition", "hpc.project"], // hometriggerReservation
            onChange: ({ value }) => {
              console.log(`HPC Reservation changed to: ${value}`);
              const options = homeTriggerReservation(configId, "jupyterlab");
              setReservationOptions(options ?? []);
            },
          }}
          listeners={{
            onMount: () => {
              const options = homeTriggerReservation(configId, "jupyterlab");
              console.log("homeTriggerReservation onMount result: ", options);
              setReservationOptions(options ?? []);
            },
          }}
        >
          {(field) => (
            <field.select
              label="HPC Reservation"
              options={reservationOptions}
            />
          )}
        </form.AppField>
      </>
    );
  },
});
