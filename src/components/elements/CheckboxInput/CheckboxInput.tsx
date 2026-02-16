import React, { useId } from "react";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./CheckboxInput.css";

interface CheckboxInputProps extends BaseElementProps {
  onChange?: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  elementId,
  elementOptions,
  onChange,
}) => {
  const inputId = useId();
  const opts = elementOptions.input?.options ?? {};

  return (
    <div className="checkbox-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={inputId}
        disabled={opts.enabled === false}
      />

      <div className="checkbox-input__field-wrapper">
        <Checkbox.Root
          id={inputId}
          className="checkbox-input__root"
          defaultChecked={opts.default === true}
          disabled={opts.enabled === false}
          required={opts.required}
          onCheckedChange={(checked) => onChange?.(checked === true)}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {opts.warning && (
          <div className="checkbox-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default CheckboxInput;
