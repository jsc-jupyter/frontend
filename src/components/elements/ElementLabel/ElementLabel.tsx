import React from "react";
import { Checkbox, Label, Tooltip } from "radix-ui";
import { CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import type { LabelOptions } from "../types";
import "./ElementLabel.css";

interface ElementLabelProps {
  elementId: string;
  labelOptions?: LabelOptions;
  htmlFor?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

const ElementLabel: React.FC<ElementLabelProps> = ({
  elementId,
  labelOptions = {},
  htmlFor,
  disabled = false,
  defaultChecked = false,
  onCheckboxChange,
}) => {
  const {
    type: labelType = "",
    value: labelValue = "",
    width = "4",
    options: labelOpts = {},
    icontext = "",
  } = labelOptions;

  const isDisabled = disabled || labelOpts.enabled === false;
  const alignRight =
    (labelOpts as Record<string, unknown>)["align-right"] !== false;

  const hasText = [
    "text",
    "texticon",
    "texticonclick",
    "texticonclickcheckbox",
    "textcheckbox",
    "texticoncheckbox",
  ].includes(labelType);

  const hasTooltipIcon = ["texticon", "texticoncheckbox"].includes(labelType);
  const hasClickIcon = labelType === "texticonclick";
  const hasCheckbox = [
    "textcheckbox",
    "texticoncheckbox",
    "texticonclickcheckbox",
  ].includes(labelType);
  const isHeader = labelType === "header";

  if (isHeader) {
    return (
      <div style={{ flexBasis: `${(Number(width) / 12) * 100}%` }}>
        <h4 className="element-label__header">{labelValue}</h4>
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
            <span dangerouslySetInnerHTML={{ __html: icontext }} />
            <Tooltip.Arrow className="element-label__tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return (
    <div
      className={`element-label ${isDisabled ? "element-label--disabled" : ""}`}
      style={{ flexBasis: `${(Number(width) / 12) * 100}%` }}
    >
      <Label.Root
        className="element-label__inner"
        htmlFor={htmlFor ?? `${elementId}-input`}
      >
        {hasText && (
          <span>{typeof labelValue === "string" ? labelValue : ""}</span>
        )}

        {(hasTooltipIcon || hasClickIcon) && tooltipContent}

        {hasCheckbox && (
          <Checkbox.Root
            className={`element-label__checkbox ${alignRight ? "" : "element-label__checkbox-left"}`}
            defaultChecked={
              defaultChecked ||
              (labelOpts as Record<string, unknown>).default === true
            }
            disabled={isDisabled}
            onCheckedChange={(checked) => onCheckboxChange?.(checked === true)}
            id={`${elementId}-input-cb`}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
        )}
      </Label.Root>
    </div>
  );
};

export default ElementLabel;
