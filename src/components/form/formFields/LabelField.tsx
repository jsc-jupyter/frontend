import React from "react";
import { Label, Tooltip } from "radix-ui";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import type { LabelOptions } from "../../types";
import "../label.css";

interface ElementLabelProps {
  label: string;
  labelOptions?: LabelOptions;
  htmlFor?: string;
  disabled?: boolean;
  hasCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

function LabelField({
  label,
  labelOptions = {},
  htmlFor,
  disabled = false,
  checked,
  onCheckboxChange,
  hasCheckbox = false,
}: ElementLabelProps) {
  const {
    type: labelType = "",
    value: labelValue = "",
    width = "4",
    icontext = "",
  } = labelOptions;

  const hasTooltipIcon = ["texticon", "texticoncheckbox"].includes(labelType);
  const hasClickIcon = labelType === "texticonclick";
  const isHeader = labelType === "header";

  if (isHeader) {
    return (
      <div style={{ flexBasis: `${(Number(width) / 12) * 100}%` }}>
        <h4 className="element-label__header">{label}</h4>
      </div>
    );
  }

  const tooltipContent = (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="element-label__tooltip-trigger"
            aria-label="More information"
          >
            <InfoCircledIcon />
            {hasClickIcon && (
              <span className="element-label__click-hint">(click me)</span>
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="element-label__tooltip-content"
            sideOffset={5}
            side="right"
          >
            {icontext}
            <Tooltip.Arrow className="element-label__tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
  return (
    <div
      className={`element-label`}
      style={{ flexBasis: `${(4 / 12) * 100}%`, height: "1.5em" }}
    >
      <Label.Root className="element-label__inner" htmlFor={htmlFor}>
        {label}

        {(hasTooltipIcon || hasClickIcon) && tooltipContent}
      </Label.Root>
      {hasCheckbox && (
        <input
          type="checkbox"
          className="element-label__checkbox"
          name={label}
          checked={checked}
          onChange={(e) =>
            onCheckboxChange && onCheckboxChange(e.target.checked)
          }
        />
      )}
    </div>
  );
}

export default LabelField;
