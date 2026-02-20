import React, { useCallback, useEffect, useMemo } from "react";
import { componentRegistry } from "@/registry/componentRegistry";
import {
  triggerRegistry,
  type TriggerContext,
} from "@/registry/triggerRegistry";
import { useFieldStore } from "@/stores/fieldStore";
import { evaluateDependency } from "@/utils/dependencyHelper";
import type { FieldConfig } from "@/types/frontendConfig";
import type { ElementOptions } from "@/components/elements/types";

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
  const setValue = useFieldStore((s) => s.setValue);
  const registerCollected = useFieldStore((s) => s.registerCollected);
  const unregisterCollected = useFieldStore((s) => s.unregisterCollected);
  const setFieldLoading = useFieldStore((s) => s.setFieldLoading);

  const value = useFieldStore((s) => s.values[fieldName]);
  const allValues = useFieldStore((s) => s.values);

  const isCollected = !!config.input?.options?.collect;

  useEffect(() => {
    if (isCollected) {
      registerCollected(fieldName);
    }
    return () => {
      if (isCollected) unregisterCollected(fieldName);
    };
  }, [fieldName, isCollected, registerCollected, unregisterCollected]);

  useEffect(() => {
    if (value === undefined && config.input?.options?.value != null) {
      setValue(fieldName, config.input.options.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName]);

  const depResult = useMemo(
    () => evaluateDependency(config.dependency, allValues),
    [config.dependency, allValues],
  );

  const buildTriggerContext = useCallback((): TriggerContext => {
    const store = useFieldStore.getState();
    return {
      fieldName,
      serviceId,
      getFieldValue: (name: string) => store.values[name],
      setFieldValue: (name: string, val: unknown) => store.setValue(name, val),
      getAllValues: () => ({ ...store.values }),
    };
  }, [fieldName, serviceId]);

  const handleChange = useCallback(
    async (newValue: unknown) => {
      setValue(fieldName, newValue);

      const context = buildTriggerContext();

      if (config.triggerOnChange) {
        setFieldLoading(fieldName, true);
        try {
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
      config.triggerOnChange,
      config.onInputChange,
      setValue,
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
        values: config.input.values,
      },
      dependency: config.dependency as Record<string, string[]> | undefined,
      trigger: config.trigger,
    }),
    [config, value, depResult],
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
