import React from "react";
import { Checkbox, Label } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./MultipleCheckboxes.css";

interface CheckboxItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

interface MultipleCheckboxesProps extends BaseElementProps {
  items?: CheckboxItem[];
  onCheckboxChange?: (id: string, checked: boolean) => void;
}

const MultipleCheckboxes: React.FC<MultipleCheckboxesProps> = ({
  elementId,
  elementOptions,
  items = [],
  onCheckboxChange,
}) => {
  const opts = elementOptions.input?.options ?? {};

  return (
    <div className="multiple-checkboxes">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        disabled={opts.enabled === false}
      />

      <div className="multiple-checkboxes__grid">
        {items.map((item) => (
          <div key={item.id} className="multiple-checkboxes__item">
            <Checkbox.Root
              id={`${elementId}-${item.id}`}
              className="multiple-checkboxes__checkbox"
              defaultChecked={item.defaultChecked}
              disabled={item.disabled || opts.enabled === false}
              onCheckedChange={(checked) =>
                onCheckboxChange?.(item.id, checked === true)
              }
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root htmlFor={`${elementId}-${item.id}`}>
              {item.label}
            </Label.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleCheckboxes;
