import React, { useState } from "react";
import { Label } from "radix-ui";
import AvailableFlavors from "./AvailableFlavors";

// TODO : Use actual values
// TODO : Refactor inline styles to CSS or styled-components
const DockerFlavor = () => {
  const [flavor, setFlavor] = useState<string>("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 10px",
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="mountUserData">
          Mount user data
        </Label.Root>
        <input
          id="mountUserData"
          inputMode="text"
          defaultValue={flavor}
          onChange={(e) => setFlavor(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 10px",
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="image">
          Image
        </Label.Root>
        <input
          id="image"
          inputMode="text"
          defaultValue={flavor}
          onChange={(e) => setFlavor(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 10px",
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="imageRegistry">
          Private image registry
        </Label.Root>
        <input
          id="imageRegistry"
          inputMode="text"
          defaultValue={flavor}
          onChange={(e) => setFlavor(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 10px",
        }}
      >
        <Label.Root className="LabelRoot" htmlFor="flavor">
          Flavor
        </Label.Root>
        <select
          id="flavor"
          defaultValue={flavor}
          onChange={(e) => setFlavor(e.target.value)}
        >
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="middle">Middle</option>
          <option value="big">Big</option>
          <option value="giant">Giant</option>
        </select>
      </div>
      <AvailableFlavors />
    </div>
  );
};

export default DockerFlavor;
