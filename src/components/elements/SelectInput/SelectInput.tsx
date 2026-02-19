import React, { useId } from "react";
import { Select } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./SelectInput.css";

interface SelectInputProps extends BaseElementProps {
  onChange?: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  elementId,
  elementOptions,
  onChange,
}) => {
  const labelId = useId();
  const opts = elementOptions.input?.options ?? {};
  const values = elementOptions.input?.values ?? {};
  const entries = Object.entries(values);

  const defaultValue =
    opts.value != null && opts.value !== "" ? String(opts.value) : undefined;

  return (
    <div className="select-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={labelId}
        disabled={opts.enabled === false}
      />

      <div className="select-input__field-wrapper">
        <Select.Root
          defaultValue={defaultValue}
          disabled={opts.enabled === false}
          required={opts.required}
          onValueChange={(val) => onChange?.(val)}
        >
          <Select.Trigger
            id={labelId}
            className="select-input__trigger"
            aria-label={
              typeof elementOptions.label?.value === "string"
                ? elementOptions.label.value
                : elementId
            }
          >
            <Select.Value placeholder="Select an option…" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="select-input__content"
              position="popper"
              sideOffset={4}
            >
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select-input__viewport">
                {entries.map(([key, label]) => (
                  <Select.Item
                    key={key}
                    value={key}
                    className="select-input__item"
                  >
                    <Select.ItemIndicator className="select-input__item-indicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {opts.warning && (
          <div className="select-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
