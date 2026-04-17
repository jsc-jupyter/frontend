import LabelField from "./LabelField";
import TextInput from "./TextInput";

interface TextFieldProps {
  label: string;
  required?: boolean;
  enabled?: boolean;
  placeholder?: string;
  secret?: boolean;
  copy?: boolean;
  pattern?: string;
  warning?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

function TextCheckboxField({
  label,
  required = false,
  enabled,
  placeholder,
  secret = false,
  copy = false,
  pattern,
  warning,
  checked,
  onCheckboxChange,
}: TextFieldProps) {
  const handleCheckboxChange = (checked: boolean) => {
    if (onCheckboxChange) {
      onCheckboxChange(checked);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 0,
        marginBottom: "0.25rem",
      }}
    >
      <LabelField
        label={label}
        htmlFor={label}
        hasCheckbox={true}
        checked={checked}
        onCheckboxChange={handleCheckboxChange}
      />

      <TextInput
        label={label}
        required={required}
        enabled={checked ? enabled : false}
        placeholder={placeholder}
        secret={secret}
        copy={copy}
        pattern={pattern}
        warning={warning}
      />
    </div>
  );
}
export default TextCheckboxField;
