import React from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./LabelOnly.css";

type LabelOnlyProps = BaseElementProps;

const LabelOnly = ({ elementId, elementOptions }: LabelOnlyProps) => {
  const opts = elementOptions.input?.options ?? {};

  return (
    <div className="label-only">
      <ElementLabel
        elementId={elementId}
        labelOptions={elementOptions.label}
        disabled={opts.enabled === false}
      />
    </div>
  );
};

export default LabelOnly;
