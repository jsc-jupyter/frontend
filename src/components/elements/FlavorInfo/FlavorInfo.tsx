import React from "react";
import type { BaseElementProps } from "../types";
import "./FlavorInfo.css";

interface FlavorInfoProps extends BaseElementProps {
  children?: React.ReactNode;
}

/**
 * Container for dynamically-loaded flavor data (e.g. via SSE).
 * Renders children or an empty placeholder that can be populated by a parent.
 */
const FlavorInfo: React.FC<FlavorInfoProps> = ({ elementId, children }) => {
  return (
    <div id={`${elementId}-flavor-info`} className="flavor-info">
      {children}
    </div>
  );
};

export default FlavorInfo;
