import React, { useState, useCallback, useMemo, useId } from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./DateInput.css";

interface DateInputProps extends BaseElementProps {
  onChange?: (value: string) => void;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

const DateInput = ({ elementId, elementOptions, onChange }: DateInputProps) => {
  const inputId = useId();
  const opts = elementOptions.input?.options ?? {};

  const { defaultValue, minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const plusHalfYear = new Date(new Date().setMonth(today.getMonth() + 6));
    const plusOneYear = new Date(
      new Date().setFullYear(today.getFullYear() + 1),
    );
    return {
      defaultValue: formatDate(plusHalfYear),
      minDate: formatDate(today),
      maxDate: formatDate(plusOneYear),
    };
  }, []);

  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <div className="date-input">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        htmlFor={inputId}
        disabled={opts.enabled === false}
      />

      <div className="date-input__field-wrapper">
        <input
          id={inputId}
          type="date"
          className="date-input__input"
          name={opts.name ?? elementId}
          value={value}
          min={minDate}
          max={maxDate}
          disabled={opts.enabled === false}
          onChange={handleChange}
        />
        {opts.warning && (
          <div className="date-input__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default DateInput;
