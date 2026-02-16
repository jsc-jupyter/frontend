import React, { useState, useCallback, useId } from "react";
import { EyeOpenIcon, EyeClosedIcon, CopyIcon } from "@radix-ui/react-icons";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./TextInput.css";

interface TextInputProps extends BaseElementProps {
  onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  elementId,
  elementOptions,
  onChange,
}) => {
  const inputId = useId();
  const opts = elementOptions.input?.options ?? {};
  const isSecret = !!opts.secret;
  const isCopy = !!opts.copy;

  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(
    opts.value != null ? String(opts.value) : "",
  );
  const [invalid, setInvalid] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      onChange?.(val);

      if (opts.pattern) {
        const regex = new RegExp(opts.pattern);
        setInvalid(!regex.test(val));
      }
    },
    [onChange, opts.pattern],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
    }
  }, [value]);

  const inputType = isSecret && !showPassword ? "password" : "text";
  const hasGroup = isSecret || isCopy;

  const input = (
    <input
      id={inputId}
      type={inputType}
      className={`text-input__input ${invalid ? "text-input__input--invalid" : ""}`}
      name={opts.name ?? elementId}
      value={value}
      placeholder={opts.placeholder ?? ""}
      pattern={opts.pattern}
      required={opts.required}
      disabled={opts.enabled === false}
      onChange={handleChange}
    />
  );

  return (
    <div className="text-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={inputId}
        disabled={opts.enabled === false}
      />

      <div className="text-input__field-wrapper">
        {hasGroup ? (
          <div className="text-input__input-group">
            {input}
            {isSecret && (
              <button
                type="button"
                className="text-input__toggle-btn"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            )}
            {isCopy && (
              <button
                type="button"
                className="text-input__copy-btn"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                title="Copy to clipboard"
              >
                <CopyIcon />
              </button>
            )}
          </div>
        ) : (
          input
        )}
        {opts.warning && (
          <div className="text-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
