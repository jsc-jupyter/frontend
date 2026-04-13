import { getModuleValues } from "../dataFunctions";
import { withForm } from "@/hooks/formContext";
import { useStore } from "@tanstack/react-form";
import { ModuleGroupForm } from "./ModuleGroupForm";
import { defaultFormValues } from "../shared";

export const ModuleForm = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    const system = useStore(form.store, (state) => state.values.system);
    const option = useStore(form.store, (state) => state.values.option);
    const systems = system ? [system] : [];
    const options = option ? [option] : [];

    const communityModules = getModuleValues(
      options,
      systems,
      "JupyterLab",
      "communities",
      "communitySet",
    );
    const extensionModules = getModuleValues(
      options,
      systems,
      "JupyterLab",
      "extensions",
      "extensionSet",
    );
    const kernelModules = getModuleValues(
      options,
      systems,
      "JupyterLab",
      "kernels",
      "kernelSet",
    );
    const proxyModules = getModuleValues(
      options,
      systems,
      "JupyterLab",
      "proxies",
      "proxySet",
    );

    return (
      <>
        <ModuleGroupForm
          form={form}
          name="modules.communities"
          label="Communities"
          config={communityModules}
        />
        <ModuleGroupForm
          form={form}
          name="modules.extensions"
          label="Extensions"
          config={extensionModules}
        />
        <ModuleGroupForm
          form={form}
          name="modules.kernels"
          label="Kernels"
          config={kernelModules}
        />
        <ModuleGroupForm
          form={form}
          name="modules.proxies"
          label="Proxies"
          config={proxyModules}
        />
      </>
    );
  },
});
