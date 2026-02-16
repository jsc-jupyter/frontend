import React, { useState, useCallback, useId } from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./TextAreaInput.css";

interface TextAreaInputProps extends BaseElementProps {
  onChange?: (value: string) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  elementId,
  elementOptions,
  onChange,
}) => {
  const inputId = useId();
  const opts = elementOptions.input?.options ?? {};
  const rows = typeof opts.rows === "number" ? opts.rows : 4;

  const [value, setValue] = useState(
    opts.value != null ? String(opts.value) : "",
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <div className="textarea-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={inputId}
        disabled={opts.enabled === false}
      />

      <div className="textarea-input__field-wrapper">
        <textarea
          id={inputId}
          className="textarea-input__textarea"
          name={opts.name ?? elementId}
          value={value}
          placeholder={opts.placeholder ?? ""}
          required={opts.required}
          disabled={opts.enabled === false}
          rows={rows}
          onChange={handleChange}
        />
        {opts.warning && (
          <div className="textarea-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default TextAreaInput;
