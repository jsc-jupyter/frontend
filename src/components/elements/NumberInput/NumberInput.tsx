import React, { useState, useCallback, useId } from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./NumberInput.css";

interface NumberInputProps extends BaseElementProps {
  onChange?: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  elementId,
  elementOptions,
  onChange,
}) => {
  const inputId = useId();
  const opts = elementOptions.input?.options ?? {};

  const [value, setValue] = useState(
    opts.value != null && opts.value !== "" ? String(opts.value) : "",
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      const num = parseFloat(val);
      if (!isNaN(num)) {
        onChange?.(num);
      }
    },
    [onChange],
  );

  return (
    <div className="number-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={inputId}
        disabled={opts.enabled === false}
      />

      <div className="number-input__field-wrapper">
        <input
          id={inputId}
          type="number"
          className="number-input__input"
          name={opts.name ?? elementId}
          value={value}
          placeholder={opts.placeholder ?? ""}
          pattern={opts.pattern}
          required={opts.required}
          disabled={opts.enabled === false}
          onChange={handleChange}
        />
        {opts.warning && (
          <div className="number-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
