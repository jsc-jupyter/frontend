import React from "react";
import { Collapsible } from "radix-ui";
import JupyterLabTab from "./JupyterLabTab";

// TODO : Add animations to the collapsible row
// TODO : Refactor inline styles to CSS or styled-components

interface JupyterlabCollapsibleRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server: any;
  configIndex: number;
}

const JupyterlabCollapsibleRow = ({
  server,
  configIndex,
}: JupyterlabCollapsibleRowProps) => {
  console.log(server);
  console.log(configIndex);
  return (
    <Collapsible.Root asChild>
      <tbody style={{ backgroundColor: "darkgray" }}>
        <Collapsible.Trigger asChild>
          <tr style={{ WebkitAppearance: "unset" }}>
            <td />
            <td> {server.name} </td>
            <td> {server.system} </td>
            <td> {server.service} </td>
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
              <JupyterLabTab configIndex={configIndex} />
            </td>
          </tr>
        </Collapsible.Content>
      </tbody>
    </Collapsible.Root>
  );
};

export default JupyterlabCollapsibleRow;
