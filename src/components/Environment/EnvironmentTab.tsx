import React, { useContext } from "react";
import {
  useConfigByIndex,
  useAddEnvironment,
  useUpdateEnvironment,
  useDeleteEnvironment,
  JupyterlabIDContext,
} from "../../stores";

// TODO : Split into smaller components if needed
// TODO : Add styling and better UI elements
// TODO : Add validation for environment variable names and values
// TODO : Check unique names for environment variables

const EnvironmentTab = () => {
  const configIndex = useContext(JupyterlabIDContext);
  const config = useConfigByIndex(configIndex);
  const environmentVariables = config?.environments;
  const addEnvironment = useAddEnvironment();
  const updateEnvironment = useUpdateEnvironment();
  const deleteEnvironment = useDeleteEnvironment();
  console.log(environmentVariables);
  console.log(typeof environmentVariables);
  if (!config) return null;

  const handleAddEnvironment = () => {
    addEnvironment(config.id, {
      name: "JUPYTER_CUSTOM_VAR_" + (environmentVariables.length + 1),
      value: "new-value",
    });
  };

  const handleUpdateEnvironmentName = (envName: string, newName: string) => {
    updateEnvironment(config.id, envName, { name: newName });
  };

  const handleUpdateEnvironmentValue = (envName: string, newValue: string) => {
    updateEnvironment(config.id, envName, { value: newValue });
    console.log(environmentVariables);
  };

  const handleDeleteEnvironment = (envName: string) => {
    deleteEnvironment(config.id, envName);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>Add Environment Variable</span>
        <button onClick={handleAddEnvironment} />
      </div>
      {environmentVariables &&
        environmentVariables.map((envVar, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px",
            }}
          >
            <input
              type="text"
              value={envVar.name}
              onChange={(e) =>
                handleUpdateEnvironmentName(envVar.name, e.target.value)
              }
            />
            <input
              type="text"
              value={envVar.value}
              onChange={(e) =>
                handleUpdateEnvironmentValue(envVar.name, e.target.value)
              }
            />
            <button onClick={() => handleDeleteEnvironment(envVar.name)}>
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default EnvironmentTab;
