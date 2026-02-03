import React from "react";
import {
  useConfigStore,
  useConfigs,
  useConfigActions,
  useConfigById,
  useConfigsByService,
  Config,
} from "../stores";

export const BasicExample: React.FC = () => {
  const configs = useConfigStore((state) => state.configs);
  const addConfig = useConfigStore((state) => state.addConfig);

  const handleAddConfig = () => {
    addConfig({
      name: "Production Config",
      service: "api-service",
      system: "production",
      option: "standard",
      profile: "default",
      environments: [
        { name: "DATABASE_URL", value: "postgres://prod-db" },
        { name: "API_KEY", value: "prod-key-123" },
      ],
    });
  };

  return (
    <div>
      <h2>Configs: {configs.length}</h2>
      <button onClick={handleAddConfig}>Add Config</button>
      <ul>
        {configs.map((config) => (
          <li key={config.id}>{config.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const OptimizedExample: React.FC = () => {
  const configs = useConfigs();
  const actions = useConfigActions();

  const handleAddConfig = () => {
    actions.addConfig({
      name: "Dev Config",
      service: "web-app",
      system: "development",
      option: "debug",
      profile: "developer",
      environments: [],
    });
  };

  return (
    <div>
      <button onClick={handleAddConfig}>Add Config</button>
      <ConfigList configs={configs} />
    </div>
  );
};

interface ConfigDetailProps {
  configId: string;
}

export const ConfigDetail: React.FC<ConfigDetailProps> = ({ configId }) => {
  const config = useConfigById(configId);
  const actions = useConfigActions();

  if (!config) {
    return <div>Config not found</div>;
  }

  const handleUpdateName = () => {
    actions.updateConfig(configId, { name: "Updated Name" });
  };

  const handleAddEnvironment = () => {
    actions.addEnvironment(configId, {
      name: "NEW_VAR",
      value: "new-value",
    });
  };

  return (
    <div>
      <h3>{config.name}</h3>
      <p>Service: {config.service}</p>
      <p>System: {config.system}</p>
      <button onClick={handleUpdateName}>Update Name</button>
      <button onClick={handleAddEnvironment}>Add Environment</button>

      <h4>Environments:</h4>
      <ul>
        {config.environments.map((env) => (
          <li key={env.name}>
            {env.name}: {env.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceConfigsProps {
  service: string;
}

export const ServiceConfigs: React.FC<ServiceConfigsProps> = ({ service }) => {
  const configs = useConfigsByService(service);

  return (
    <div>
      <h3>Configs for {service}</h3>
      <ConfigList configs={configs} />
    </div>
  );
};

export const EnvironmentManager: React.FC<{ configId: string }> = ({
  configId,
}) => {
  const config = useConfigById(configId);
  const actions = useConfigActions();

  if (!config) return null;

  const handleUpdateEnvironment = (envName: string, newValue: string) => {
    actions.updateEnvironment(configId, envName, { value: newValue });
  };

  const handleDeleteEnvironment = (envName: string) => {
    actions.deleteEnvironment(configId, envName);
  };

  return (
    <div>
      {config.environments.map((env) => (
        <div key={env.name}>
          <span>{env.name}: </span>
          <input
            value={env.value}
            onChange={(e) => handleUpdateEnvironment(env.name, e.target.value)}
          />
          <button onClick={() => handleDeleteEnvironment(env.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

/**
 * Example 6: Bulk operations
 */
export const BulkOperations: React.FC = () => {
  const actions = useConfigActions();

  const handleLoadSampleData = () => {
    const sampleConfigs: Omit<Config, "id">[] = [
      {
        name: "Dev Config",
        service: "api",
        system: "dev",
        option: "debug",
        profile: "developer",
        environments: [{ name: "DEBUG", value: "true" }],
      },
      {
        name: "Prod Config",
        service: "api",
        system: "prod",
        option: "release",
        profile: "production",
        environments: [{ name: "DEBUG", value: "false" }],
      },
    ];

    // Add configs one by one
    sampleConfigs.forEach((config) => actions.addConfig(config));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all configs?")) {
      actions.clearAllConfigs();
    }
  };

  return (
    <div>
      <button onClick={handleLoadSampleData}>Load Sample Data</button>
      <button onClick={handleClearAll}>Clear All</button>
    </div>
  );
};

// Helper component
const ConfigList: React.FC<{ configs: Config[] }> = ({ configs }) => {
  return (
    <ul>
      {configs.map((config) => (
        <li key={config.id}>
          {config.name} - {config.service} ({config.environments.length} envs)
        </li>
      ))}
    </ul>
  );
};
