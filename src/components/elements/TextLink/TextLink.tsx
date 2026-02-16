import React from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./TextLink.css";

type TextLinkProps = BaseElementProps;

const TextLink: React.FC<TextLinkProps> = ({ elementId, elementOptions }) => {
  const opts = elementOptions.input?.options ?? {};
  const href = typeof opts.href === "string" ? opts.href : "#";
  const text = typeof opts.text === "string" ? opts.text : elementId;
  const isDisabled = opts.enabled === false;

  return (
    <div className="text-link">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        disabled={isDisabled}
      />

      <div className="text-link__field-wrapper">
        <a
          id={`${elementId}-link`}
          className={`text-link__anchor ${isDisabled ? "text-link__anchor--disabled" : ""}`}
          href={href}
          rel="noopener noreferrer"
          aria-disabled={isDisabled || undefined}
          onClick={isDisabled ? (e) => e.preventDefault() : undefined}
        >
          {text}
        </a>
      </div>
    </div>
  );
};

export default TextLink;
