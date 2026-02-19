import React from "react";
import { Label } from "radix-ui";

type SelectRowProps = {
  label: string;
  id: string;
  options: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const SelectRow = ({
  label,
  id,
  options,
  defaultValue,
  onChange,
}: SelectRowProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2px 10px",
      }}
    >
      <Label.Root className="LabelRoot" htmlFor={id}>
        {label}
      </Label.Root>
      <select
        className="Input"
        id={id}
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled || false}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRow;
