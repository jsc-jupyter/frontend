import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { componentRegistry } from "@/registry/componentRegistry";
import {
  triggerRegistry,
  type TriggerContext,
} from "@/registry/triggerRegistry";
import { useConfigStore } from "@/stores/jupyterStore";
import { evaluateDependency } from "@/utils/dependencyHelper";
import type { FieldConfig } from "@/types/frontendConfig";
import type { ElementOptions } from "@/components/elements/types";
import { useGetFieldValue } from "@/stores/hooks";
import { JupyterlabIDContext } from "@/stores";

export interface FieldOrchestratorProps {
  // Unique field name as it appears in the tab config (e.g. "system"). */
  fieldName: string;
  config: FieldConfig;
  // Service this field belongs to (e.g. "jupyterlab"). */
  serviceId: string;
  // Tab this field belongs to (e.g. "labconfig"). */
  tabId: string;
  // Row id (if inside a collapsible / spawner row)
  rowId?: string;
  // Whether this is the first row in the table (affects button rendering)
  isFirstRow?: boolean;
}

export const FieldOrchestrator = ({
  fieldName,
  config,
  serviceId,
  tabId,
  rowId = "",
  isFirstRow = false,
}: FieldOrchestratorProps) => {
  const configIndex = useContext(JupyterlabIDContext);
  const value = useGetFieldValue(configIndex, fieldName);
  const setFieldValue = useConfigStore((s) => s.setFieldValue);
  const setFieldLoading = useConfigStore((s) => s.setFieldLoading);
  const allValues =
    useConfigStore(
      (s) =>
        s.frontendCollection.decrypted_user_options[configIndex] as
          | Record<string, unknown>
          | undefined,
    ) ?? {};
  const options: Record<string, string> = {};

  if (fieldName === "system") {
    options["JSC-Cloud"] = "JSC-Cloud";
    options["JUWELS"] = "JUWELS";
    options["JUSUF"] = "JUSUF";
    options["JURECA"] = "JURECA";
    options["Jupiter"] = "Jupiter";
  } else if (fieldName === "option") {
    options["4.3"] = "4.3";
    options["4.2"] = "4.2";
    options["3.6"] = "3.6";
    options["repo2docker"] = "repo2docker";
    options["xpra"] = "xpra";
    options["custom"] = "custom";
  }

  // Seed default value from config if FrontendCollection has no value yet
  useEffect(() => {
    if (value === undefined && config.input?.options?.value != null) {
      setFieldValue(configIndex, fieldName, config.input.options.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName]);

  console.log(config);
  const depResult = useMemo(
    () => evaluateDependency(config.dependency, allValues),
    [config.dependency, allValues],
  );

  const buildTriggerContext = useCallback((): TriggerContext => {
    const store = useConfigStore.getState();
    return {
      fieldName,
      configId: configIndex,
      serviceId,
      getFieldValue: (name: string) => store.getFieldValue(configIndex, name),
      setFieldValue: (name: string, val: unknown) =>
        store.setFieldValue(configIndex, name, val),
      getAllValues: () => store.getAllFieldValues(configIndex),
    };
  }, [fieldName, serviceId, configIndex]);

  const handleChange = useCallback(
    async (newValue: unknown) => {
      setFieldValue(configIndex, fieldName, newValue);

      const context = buildTriggerContext();
      console.log(context);
      if (config.triggerOnChange) {
        setFieldLoading(fieldName, true);
        try {
          console.log(
            `Executing trigger "${config.triggerOnChange}" for field "${fieldName}" with value:`,
            newValue,
          );
          await triggerRegistry.execute(
            config.triggerOnChange,
            newValue,
            context,
          );
        } finally {
          setFieldLoading(fieldName, false);
        }
      }

      if (config.onInputChange) {
        await triggerRegistry.execute(config.onInputChange, newValue, context);
      }
    },
    [
      fieldName,
      configIndex,
      config.triggerOnChange,
      config.onInputChange,
      setFieldValue,
      buildTriggerContext,
      setFieldLoading,
    ],
  );

  const elementOptions: ElementOptions = useMemo(
    () => ({
      label: config.label
        ? {
            type: config.label.type,
            value: config.label.value,
            width:
              config.label.width != null
                ? String(config.label.width)
                : undefined,
            options: config.label.options as
              | Record<string, unknown>
              | undefined,
            icontext: config.label.icontext,
          }
        : undefined,
      input: {
        type: config.input.type,
        options: {
          ...config.input.options,
          // Overlay the current store value (if any) onto the static config
          value:
            value !== undefined
              ? (value as string | number | boolean)
              : config.input.options?.value,
          // Coerce "show" → true since element components expect boolean
          enabled: depResult.disabled
            ? false
            : config.input.options?.enabled === "show"
              ? true
              : (config.input.options?.enabled ?? true),
          show: depResult.visible
            ? (config.input.options?.show ?? true)
            : false,
        },
        values: options,
      },
      dependency: config.dependency as Record<string, string[]> | undefined,
      trigger: config.trigger,
    }),
    [config, value, depResult, options],
  );

  if (!depResult.visible) {
    return null;
  }

  const Component = componentRegistry.get(config.input.type);

  if (!Component) {
    if (import.meta.env.DEV) {
      console.warn(
        `[FieldOrchestrator] No component registered for type "${config.input.type}" (field: ${fieldName})`,
      );
    }
    return null;
  }

  return (
    <Component
      serviceId={serviceId}
      rowId={rowId}
      tabId={tabId}
      elementId={fieldName}
      elementOptions={elementOptions}
      onChange={handleChange}
      isFirstRow={isFirstRow}
    />
  );
};
