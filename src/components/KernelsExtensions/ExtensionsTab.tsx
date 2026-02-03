import { Separator } from "radix-ui";
import React from "react";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Implement
// TODO : Extract components/styles where applicable
const ExtensionsTab = () => {
  const frontendCollection = window.getFrontendCollection();
  const userModules = frontendCollection.userModules;
  console.log(userModules);

  return (
    <div>
      <h3>Communities</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.entries(userModules.communities).map(([name, details]) => (
          <div key={name}>
            <input type="checkbox" checked={details.default} />
            <span>{details.displayName}</span>
          </div>
        ))}
      </div>
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
      <h3>Extensions</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.entries(userModules.extensions).map(([name, details]) => (
          <div key={name}>
            <input type="checkbox" checked={details.default} />
            <span>{details.displayName}</span>
          </div>
        ))}
      </div>
      <h3>Kernels</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.entries(userModules.kernels).map(([name, details]) => (
          <div key={name}>
            <input type="checkbox" checked={details.default} />
            <span>{details.displayName}</span>
          </div>
        ))}
      </div>
      <h3>Proxies</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.entries(userModules.proxies).map(([name, details]) => (
          <div key={name}>
            <input type="checkbox" checked={details.default} />
            <span>{details.displayName}</span>
          </div>
        ))}
      </div>
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input type="checkbox" checked={false} />
        <span>Select all</span>
        <input type="checkbox" checked={false} />
        <span>Deselect all</span>
      </div>
      <Separator.Root
        style={{
          width: "100%",
          height: "2px",
          background: "#ff0303",
          margin: "15px 0",
        }}
      />
    </div>
  );
};

export default ExtensionsTab;
