import React from "react";
import ElementLabel from "../ElementLabel/ElementLabel";
import type { BaseElementProps } from "../types";
import "./LabelOnly.css";

type LabelOnlyProps = BaseElementProps;

const LabelOnly: React.FC<LabelOnlyProps> = ({
  elementId,
  elementOptions,
}) => {
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
