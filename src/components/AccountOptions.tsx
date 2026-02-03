import React, { useState } from "react";
import SelectRow from "./SelectRow";

// TODO : Use actual values
// TODO : Refactor inline styles to CSS or styled-components
const AccountOptions = () => {
  const [account, setAccount] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [partition, setPartition] = useState<string>("");
  const [reservation, setReservation] = useState<string>("");

  return (
    <div>
      <SelectRow
        id="account"
        label="Account"
        options={[
          { value: "tiny", label: "Tiny" },
          { value: "small", label: "Small" },
          { value: "middle", label: "Middle" },
          { value: "big", label: "Big" },
          { value: "giant", label: "Giant" },
        ]}
        defaultValue={account}
        onChange={setAccount}
      />
      <SelectRow
        id="project"
        label="Project"
        options={[
          { value: "tiny", label: "Tiny" },
          { value: "small", label: "Small" },
          { value: "middle", label: "Middle" },
          { value: "big", label: "Big" },
          { value: "giant", label: "Giant" },
        ]}
        defaultValue={project}
        onChange={setProject}
      />
      <SelectRow
        id="partition"
        label="Partition"
        options={[
          { value: "tiny", label: "Tiny" },
          { value: "small", label: "Small" },
          { value: "middle", label: "Middle" },
          { value: "big", label: "Big" },
          { value: "giant", label: "Giant" },
        ]}
        defaultValue={partition}
        onChange={setPartition}
      />
      <SelectRow
        id="reservation"
        label="Reservation"
        options={[
          { value: "tiny", label: "Tiny" },
          { value: "small", label: "Small" },
          { value: "middle", label: "Middle" },
          { value: "big", label: "Big" },
          { value: "giant", label: "Giant" },
        ]}
        defaultValue={reservation}
        onChange={setReservation}
      />
    </div>
  );
};

export default AccountOptions;
