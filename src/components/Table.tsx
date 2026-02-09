import React, { useEffect } from "react";
import JupyterlabCollapsibleRow from "./JupyterLabCollabsibleRow";
import { useConfigStore, Environment } from "@/stores";
import { getFrontendCollection } from "@/utils/frontendCollectionHelper";

// TODO : Refactor inline styles to CSS or styled-components
// TODO : Better handling

const Table = () => {
  const configs = useConfigStore((state) => state.configs);
  const addConfig = useConfigStore((state) => state.addConfig);

  useEffect(() => {
    const frontendCollection = getFrontendCollection();
    const userServers = Object.entries(
      frontendCollection.decrypted_user_options,
    );
    // Remove first entry which is empty
    userServers.splice(0, 1);
    for (const [id, server] of userServers) {
      addConfig!({
        id: id.toString(),
        name: server.name,
        service: server.service,
        system: server.system,
        option: server.option,
        profile: server.profile,
        environments: server.envvariables
          ? (Object.entries(server.envvariables).map(([name, value]) => ({
              name,
              value,
            })) as Environment[])
          : [],
        storages: server.storages || [],
        communities: server.modules?.communities
          ? server.modules.communities.map((name) => ({
              name,
              version: server.module_versions?.[name]?.[0] || "",
            }))
          : [],
        extensions: server.modules?.extensions
          ? server.modules.extensions.map((name) => ({
              name,
              version: server.module_versions?.[name]?.[0] || "",
            }))
          : [],
        kernels: server.modules?.kernels
          ? server.modules.kernels.map((name) => ({
              name,
              version: server.module_versions?.[name]?.[0] || "",
            }))
          : [],
        proxies: server.modules?.proxies
          ? server.modules.proxies.map((name) => ({
              name,
              version: server.module_versions?.[name]?.[0] || "",
            }))
          : [],
      });
    }
  }, []);

  return (
    <table style={{ width: "100%" }}>
      <thead style={{ backgroundColor: "gray" }}>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Configuration</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      {configs.map((_config, index) => (
        <JupyterlabCollapsibleRow key={index} configIndex={index} />
      ))}
    </table>
  );
};

export default Table;
