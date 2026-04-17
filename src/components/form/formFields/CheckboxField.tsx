import { useFieldContext } from "@/hooks/formContext";
import "../text.css";
import "../label.css";
import LabelField from "./LabelField";

interface CheckboxFieldProps {
  label: string;
}

function CheckboxField({ label }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  return (
    <div className="text-input">
      <LabelField label={label} htmlFor={label} />

      <div className="text-input__field-wrapper">
        <input
          type="checkbox"
          className={"text-input__input"}
          name={label}
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
        />
      </div>
    </div>
  );
}

export default CheckboxField;
