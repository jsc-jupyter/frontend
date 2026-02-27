import React from "react";
import { Collapsible } from "radix-ui";
import JupyterLabTab from "./JupyterLabTab";
import { useConfigById } from "@/stores";

// TODO : Add animations to the collapsible row
// TODO : Refactor inline styles to CSS or styled-components

interface JupyterlabCollapsibleRowProps {
  configId: string;
}

const JupyterlabCollapsibleRow = ({
  configId,
}: JupyterlabCollapsibleRowProps) => {
  const config = useConfigById(configId);
  return (
    <Collapsible.Root asChild>
      <tbody style={{ backgroundColor: "darkgray" }}>
        <Collapsible.Trigger asChild>
          <tr style={{ WebkitAppearance: "unset" }}>
            <td />
            <td> {config.name} </td>
            <td> {config.system} </td>
            <td> {config.service} </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Stop clicked");
                }}
              >
                Stop
              </button>
              <button>Delete</button>
            </td>
          </tr>
        </Collapsible.Trigger>
        <Collapsible.Content asChild>
          <tr>
            <td colSpan={5}>
              <JupyterLabTab configId={configId} />
            </td>
          </tr>
        </Collapsible.Content>
      </tbody>
    </Collapsible.Root>
  );
};

export default JupyterlabCollapsibleRow;
