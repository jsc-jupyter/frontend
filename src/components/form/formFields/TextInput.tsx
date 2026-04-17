import { useFieldContext } from "@/hooks/formContext";
import { CopyIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import "../text.css";
import "../label.css";

interface TextFieldProps {
  label: string;
  required?: boolean;
  enabled?: boolean;
  placeholder?: string;
  secret?: boolean;
  copy?: boolean;
  pattern?: string;
  warning?: string;
}

function TextInput({
  label,
  required = false,
  enabled,
  placeholder,
  secret = false,
  copy = false,
  pattern,
  warning,
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const isSecret = !!secret;
  const isCopy = !!copy;
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(field.state.value);
  }, [field.state.value]);

  const inputType = isSecret && !showPassword ? "password" : "text";
  const hasGroup = isSecret || isCopy;

  const input = (
    <input
      type={inputType}
      className={"text-input__input"}
      name={label}
      value={field.state.value}
      placeholder={placeholder ?? ""}
      pattern={pattern}
      required={required}
      disabled={enabled === false}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
  return (
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
      {warning && <div className="text-input__validation">{warning}</div>}
    </div>
  );
}

export default TextInput;
