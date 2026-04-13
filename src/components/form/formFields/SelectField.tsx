import React, { useEffect } from "react";
import { Select } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "../select.css";
import "../label.css";
import { useFieldContext } from "@/hooks/formContext";
import LabelField from "./LabelField";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

interface SelectFieldProps {
  label: string;
  options: Option;
}

function SelectField({ label, options }: SelectFieldProps) {
  const field = useFieldContext<string>();
  const derivedValue = field.state.value;
  console.log("SelectField render: ", { label, options, derivedValue });
  
  useEffect(() => {
    if (field.state.value === undefined) {
      console.warn(`Field value is undefined on mount. Setting to first available option.`);
      const firstOption = options.options[0];
      if (firstOption) {
        field.handleChange(firstOption);
      }
    }
    if (options.inactiveOptions && options.inactiveOptions[derivedValue]) {
      console.warn(
        `Selected value "${derivedValue}" is in inactive options. Resetting selection.`,
      );
    }
  }, );

  const handleChange = (value: string) => {
    field.handleChange(value);
  };

  return (
    <div className="select-input">
      <LabelField label={label} htmlFor={label} />
      <div className="select-input__field-wrapper">
        <Select.Root
          value={field.state.value}
          onValueChange={(value) => handleChange(value)}
        >
          <Select.Trigger className="select-input__trigger">
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
                {options.options == null ||
                  (Object.keys(options.options).length === 0 && (
                    <Select.Item value={"none"} className="select-input__item">
                      <Select.ItemIndicator className="select-input__item-indicator">
                        <CheckIcon />
                      </Select.ItemIndicator>
                      <Select.ItemText>{options.emptyOpt}</Select.ItemText>
                    </Select.Item>
                  ))}

                {options.groups &&
                  (() => {
                    let offset = 0;
                    return Object.entries(options.groups).map(
                      ([groupName, groupLimit]) => {
                        const groupEntries = Object.entries(
                          options.options ?? {},
                        ).slice(offset, offset + groupLimit);
                        offset += groupLimit;

                        return (
                          <Select.Group key={groupName}>
                            <Select.Label className="select-input__group-label">
                              {groupName}
                            </Select.Label>
                            {groupEntries.map(([key, label]) => (
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
                          </Select.Group>
                        );
                      },
                    );
                  })()}
                {Object.keys(options.groups ?? {}).length === 0 && (
                  <>
                    {Object.entries(options.options ?? {}).map(
                      ([key, label]) => (
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
                      ),
                    )}
                    {Object.entries(options.inactiveOptions ?? {}).map(
                      ([key, label]) => (
                        <Select.Item
                          disabled
                          key={key}
                          value={key}
                          className="select-input__item select-input__item--inactive"
                        >
                          <Select.ItemIndicator className="select-input__item-indicator">
                            <CheckIcon />
                          </Select.ItemIndicator>
                          <Select.ItemText>{label}</Select.ItemText>
                        </Select.Item>
                      ),
                    )}
                  </>
                )}
              </Select.Viewport>
              <Select.ScrollDownButton>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}

export default SelectField;
