import React, { useState, useCallback } from "react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import type { BaseElementProps } from "../types";
import "./EnvVariablesEntry.css";

interface EnvVar {
  name: string;
  value: string;
}

interface EnvVariablesEntryProps extends BaseElementProps {
  onChange?: (vars: Record<string, string>) => void;
}

const EnvVariablesEntry = ({
  elementOptions,
  onChange,
}: EnvVariablesEntryProps) => {
  const [rows, setRows] = useState<EnvVar[]>([]);

  const toRecord = (items: EnvVar[]): Record<string, string> =>
    Object.fromEntries(items.map((r) => [r.name, r.value]));

  const addRow = useCallback(() => {
    setRows((prev) => {
      const next = [...prev, { name: "", value: "" }];
      onChange?.(toRecord(next));
      return next;
    });
  }, [onChange]);

  const removeRow = useCallback(
    (index: number) => {
      setRows((prev) => {
        const next = prev.filter((_, i) => i !== index);
        onChange?.(toRecord(next));
        return next;
      });
    },
    [onChange],
  );

  const updateRow = useCallback(
    (index: number, field: keyof EnvVar, val: string) => {
      setRows((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: val };
        onChange?.(toRecord(next));
        return next;
      });
    },
    [onChange],
  );

  const isDisabled = elementOptions.input?.options?.enabled === false;

  return (
    <div className="env-variables-entry">
      <div className="env-variables-entry__header">
        <span className="env-variables-entry__header-text">
          Add Environment Variables
        </span>
        <button
          type="button"
          className="env-variables-entry__add-btn"
          onClick={addRow}
          disabled={isDisabled}
          aria-label="Add environment variable"
        >
          <PlusIcon />
        </button>
      </div>

      {rows.length > 0 && (
        <table className="env-variables-entry__table">
          <thead>
            <tr>
              <th>Variable Name</th>
              <th>Variable Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="env-variables-entry__input"
                    value={row.name}
                    placeholder="Name"
                    disabled={isDisabled}
                    onChange={(e) => updateRow(index, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="env-variables-entry__input"
                    value={row.value}
                    placeholder="Value"
                    disabled={isDisabled}
                    onChange={(e) => updateRow(index, "value", e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    className="env-variables-entry__remove-btn"
                    onClick={() => removeRow(index)}
                    aria-label="Remove variable"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnvVariablesEntry;
