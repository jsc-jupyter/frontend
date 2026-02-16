import React from "react";
import { Separator } from "radix-ui";

interface HorizontalRuleProps {
  className?: string;
}

const HorizontalRule: React.FC<HorizontalRuleProps> = ({ className }) => {
  return (
    <Separator.Root
      decorative
      className={className}
      style={{
        height: 1,
        backgroundColor: "#dee2e6",
        margin: "0.5rem 0",
      }}
    />
  );
};

export default HorizontalRule;
