import React from "react";
import type { BaseElementProps } from "../types";
import "./LogContainer.css";

interface LogContainerProps extends BaseElementProps {
  logs?: string;
  terminalContent?: React.ReactNode;
}

const LogContainer: React.FC<LogContainerProps> = ({
  elementId,
  logs = "Logs collected during the Start process will be shown here.",
  terminalContent,
}) => {
  return (
    <div className="log-container">
      <div className="log-container__terminal-wrapper">
        <div id={`${elementId}-terminal`} className="log-container__terminal">
          {terminalContent}
        </div>
      </div>

      <div className="log-container__card">
        <div className="log-container__text">{logs}</div>
      </div>
    </div>
  );
};

export default LogContainer;
