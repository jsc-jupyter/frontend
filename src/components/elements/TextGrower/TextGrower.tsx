import React, { useState, useCallback } from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./TextGrower.css";

interface TextGrowerProps extends BaseElementProps {
  onChange?: (values: string[]) => void;
}

const TextGrower = ({
  elementId,
  elementOptions,
  onChange,
}: TextGrowerProps) => {
  const opts = elementOptions.input?.options ?? {};
  const isSecret = !!opts.secret;
  const isDisabled = opts.enabled === false;

  const [rows, setRows] = useState<string[]>([""]);

  const updateRow = useCallback(
    (index: number, value: string) => {
      setRows((prev) => {
        const next = [...prev];
        next[index] = value;
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const addRow = useCallback(() => {
    setRows((prev) => {
      const next = [...prev, ""];
      onChange?.(next);
      return next;
    });
  }, [onChange]);

  const removeRow = useCallback(
    (index: number) => {
      setRows((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.filter((_, i) => i !== index);
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  return (
    <div className="text-grower">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        disabled={isDisabled}
      />

      <div className="text-grower__field-wrapper">
        {rows.map((value, index) => (
          <div key={index} className="text-grower__row">
            <input
              type={isSecret ? "password" : "text"}
              className="text-grower__input"
              value={value}
              placeholder={opts.placeholder ?? ""}
              title={typeof opts.title === "string" ? opts.title : ""}
              disabled={isDisabled}
              onChange={(e) => updateRow(index, e.target.value)}
            />
            {index === rows.length - 1 ? (
              <button
                type="button"
                className="text-grower__btn text-grower__btn--add"
                onClick={addRow}
                disabled={isDisabled}
                aria-label="Add row"
              >
                <PlusIcon />
              </button>
            ) : (
              <button
                type="button"
                className="text-grower__btn text-grower__btn--remove"
                onClick={() => removeRow(index)}
                disabled={isDisabled}
                aria-label="Remove row"
              >
                <MinusIcon />
              </button>
            )}
          </div>
        ))}

        {opts.warning && (
          <div className="text-grower__validation">{opts.warning}</div>
        )}
      </div>
    </div>
  );
};

export default TextGrower;
