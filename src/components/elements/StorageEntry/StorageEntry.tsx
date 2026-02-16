import React, { useState, useCallback } from "react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import type { BaseElementProps } from "../types";
import "./StorageEntry.css";

interface StorageEntryData {
  template: string;
}

interface StorageEntryProps extends BaseElementProps {
  onChange?: (entries: StorageEntryData[]) => void;
}

const StorageEntry: React.FC<StorageEntryProps> = ({
  elementOptions,
  onChange,
}) => {
  const [rows, setRows] = useState<StorageEntryData[]>([]);
  const isDisabled = elementOptions.input?.options?.enabled === false;

  const addRow = useCallback(() => {
    setRows((prev) => {
      const next = [...prev, { template: "" }];
      onChange?.(next);
      return next;
    });
  }, [onChange]);

  const removeRow = useCallback(
    (index: number) => {
      setRows((prev) => {
        const next = prev.filter((_, i) => i !== index);
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const updateRow = useCallback(
    (index: number, value: string) => {
      setRows((prev) => {
        const next = [...prev];
        next[index] = { template: value };
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  return (
    <div className="storage-entry">
      <div className="storage-entry__header">
        <span className="storage-entry__header-text">Add Storage Mount</span>
        <button
          type="button"
          className="storage-entry__add-btn"
          onClick={addRow}
          disabled={isDisabled}
          aria-label="Add storage mount"
        >
          <PlusIcon />
        </button>
      </div>

      {rows.length > 0 && (
        <table className="storage-entry__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Template</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="storage-entry__index">{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="storage-entry__input"
                    value={row.template}
                    placeholder="Template"
                    disabled={isDisabled}
                    onChange={(e) => updateRow(index, e.target.value)}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    className="storage-entry__remove-btn"
                    onClick={() => removeRow(index)}
                    aria-label="Remove storage mount"
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

export default StorageEntry;
