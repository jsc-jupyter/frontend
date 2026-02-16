import React from "react";
import { Checkbox, Label, Separator } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import type { BaseElementProps } from "../types";
import "./SelectHelper.css";

interface SelectHelperProps extends BaseElementProps {
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

const SelectHelper: React.FC<SelectHelperProps> = ({
  elementId,
  onSelectAll,
  onDeselectAll,
}) => {
  return (
    <div className="select-helper">
      <Separator.Root
        decorative
        style={{ height: 1, backgroundColor: "#dee2e6", margin: "0.5rem 0" }}
      />
      <div className="select-helper__grid">
        <div className="select-helper__item">
          <Checkbox.Root
            id={`${elementId}-select-all`}
            className="select-helper__checkbox"
            onCheckedChange={(checked) => {
              if (checked === true) onSelectAll?.();
            }}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Label.Root htmlFor={`${elementId}-select-all`}>
            Select all
          </Label.Root>
        </div>

        <div className="select-helper__item">
          <Checkbox.Root
            id={`${elementId}-select-none`}
            className="select-helper__checkbox"
            onCheckedChange={(checked) => {
              if (checked === true) onDeselectAll?.();
            }}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Label.Root htmlFor={`${elementId}-select-none`}>
            Deselect all
          </Label.Root>
        </div>
      </div>
    </div>
  );
};

export default SelectHelper;
