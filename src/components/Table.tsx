import React from "react";
import JupyterlabCollapsibleRow from "./JupyterLabCollabsibleRow";
import { useAllConfigs } from "@/stores";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Better handling

const Table = () => {
  const configs = useAllConfigs();
  return (
    <table
      className="table table-bordered table-striped table-hover table-light align-middle"
      style={{ width: "100%" }}
    >
      <thead style={{ backgroundColor: "gray" }}>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Configuration</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      {Object.entries(configs || {}).map(([configId, _config]) => (
        <JupyterlabCollapsibleRow key={configId} configId={configId} />
      ))}
    </table>
  );
};

export default Table;
