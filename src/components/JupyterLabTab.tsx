import React from "react";
import { Tabs } from "radix-ui";
import { getFrontendConfig } from "@/utils/frontendConfigHelper";
import { evaluateDependency } from "@/utils/dependencyHelper";
import ButtonRow from "./ButtonRow";
import { HomeForm } from "./form/subforms/HomeForm";
import { EnvVariablesForm } from "./form/subforms/EnvVariablesForm";
import { ResourcesForm } from "./form/subforms/ResourceForm";
import { StorageForm } from "./form/subforms/StorageForm";
import { ModuleForm } from "./form/subforms/ModuleForm";
import { getUserOption } from "@/utils/frontendCollectionHelper";

interface JupyterLabTabProps {
  form: any;
  configId: string;
}

const JupyterLabTab = ({ form, configId }: JupyterLabTabProps) => {
  const allValues = getUserOption(configId);
  const frontendConfig = getFrontendConfig();
  const tabs =
    frontendConfig.services.options[frontendConfig.services.default].navbar;
  const depResult = Object.entries(tabs).reduce(
    (acc, [tabKey, tabConfig]) => {
      acc[tabKey] = evaluateDependency(tabConfig.dependency, allValues);
      return acc;
    },
    {} as Record<string, { visible: boolean; disabled: boolean }>,
  );
  const buttonrowConfig =
    frontendConfig.services.options[frontendConfig.services.default].tabs[
      "buttonrow"
    ];

  return (
    <Tabs.Root
      defaultValue={
        frontendConfig.services.options[frontendConfig.services.default].default
          .tab
      }
      className="jupyter-lab-tabs"
    >
      <Tabs.List className="jupyter-lab-tabs__list">
        {Object.entries(tabs).map(([tabKey, _tabConfig]) => (
          <Tabs.Trigger
            key={tabKey}
            value={tabKey}
            className="jupyter-lab-tabs__trigger"
            hidden={!depResult[tabKey].visible}
            disabled={depResult[tabKey].disabled}
          >
            {tabKey}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <form
        key={configId}
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {Object.entries(tabs).map(([tabKey, _tabConfig]) => (
          <Tabs.Content
            key={tabKey}
            value={tabKey}
            className="jupyter-lab-tabs__content"
          >
            {tabKey === "labconfig" && <HomeForm form={form} />}
            {tabKey === "envvariables" && <EnvVariablesForm form={form} />}
            {tabKey === "resources" && <ResourcesForm form={form} />}
            {tabKey === "storage" && <StorageForm form={form} />}
            {tabKey === "modules" && <ModuleForm form={form} />}
            <ButtonRow
              buttonRowConfig={buttonrowConfig.center.buttonrow}
              rowId={configId}
              serviceId={frontendConfig.services.default}
            />
            <form.AppForm>
              <form.start label="Submit" />
            </form.AppForm>
            <form.AppForm>
              <form.url />
            </form.AppForm>
            <form.AppForm>
              <form.reset />
            </form.AppForm>
          </Tabs.Content>
        ))}
      </form>
    </Tabs.Root>
  );
};

export default JupyterLabTab;

/*
Start Server:
https://jupyter-jsc-dev2.fz-juelich.de/hub/api/users/a.faldix_at_fz-juelich.de/servers/cd3ea0f69d644d639faeefaeb637fa8d/update?_xsrf=MnwxOjB8MTA6MTc3Mzk5MDY2OXw1Ol94c3JmfDEwNDpRakZpYldad2JESm5jRFZNUTFWWU1YSk5lVmh4VVhNMmJHaEZjVVZ1UkV0Q1RuTm5iMk00UjNVeGJ6MDZaamc1T0dNNU16TTNaRFZrTkdFeE16Z3dOR0V6T1dZeU56ZzFNMlZrTVRjPXxlYTE4N2MzMjNjYzNmZWZkNjA1ZjczNzRhODkwMjI4NWY2Y2FkYTA1NjZmNTkyNmJhOGNiNzE2NWQxMTBmMzBj
With Payload
{"name":"Testlab 4.2 JSCC","option":"4.2","system":"JSC-Cloud","flavor":"m1","datamount-1":{"template":"webdav","path":"webdav","remotepath":"/","type":"webdav","url":"https://b2drop.eudat.eu/remote.php/webdav/","element_id":"nextcloud","user":"TestUser1","obscure_pass":"TestPassword1","bearer_token":""},"modules":{"kernels":["java","julia","r"],"proxies":["xprahtml5","rstudio"]},"profile":"4.2","service":"jupyterlab","envvariables":{"JUPYTER_CUSTOM_VAR_1":"2"},"secret_keys":["obscure_pass"]}

Stop Server:
https://jupyter-jsc-dev2.fz-juelich.de/hub/api/users/a.faldix_at_fz-juelich.de/servers/cd3ea0f69d644d639faeefaeb637fa8d?_xsrf=MnwxOjB8MTA6MTc3Mzk5MzQ0N3w1Ol94c3JmfDg4OlpEaGtPR1V6TXpWaU9UTTJOR00yWVRoaE5tTmxZV1V6TXpkaU1UUTNOR0U2WmpnNU9HTTVNek0zWkRWa05HRXhNemd3TkdFek9XWXlOemcxTTJWa01UYz18YzU1YTFkMjVjMGFmNzY3OTZiYzU3NWY1M2FjOTg2M2RjYzhmNDZiNTM4YjI3NzkyYjdiYWQ5MzI2NWIwNjc3Nw

*/
