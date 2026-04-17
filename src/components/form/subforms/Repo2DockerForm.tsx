import { useState } from "react";
import { withForm } from "@/hooks/formContext";
import {
  defaultFormValues,
  REPOPATHTYPE,
  REPOTYPE,
} from "@/components/form/shared";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

const shortenRepoUrl = (repotype: string, repourl: string) => {
  const wwwPrefix = ["www.", ""];
  const protocols = ["https://", "http://", ""];
  let domain = "";
  let url = repourl;
  if (repotype == "gh") {
    domain = "github.com";
  } else if (repotype == "gist") {
    domain = "gist.github.com";
  } else if (repotype == "gitlab") {
    domain = "gitlab.com";
  } else if (repotype == "zenodo") {
    domain = "doi.org";
  }
  let suffix = "";
  if (domain) {
    protocols.forEach((protocol) => {
      wwwPrefix.forEach((www) => {
        suffix = `${protocol}${www}${domain}/`;
        if (url.startsWith(suffix)) url = url.slice(suffix.length);
      });
    });
  }
  return url;
};

export const Repo2DockerForm = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    const [repoTypeOptions, setRepoTypeOptions] = useState<Option>({
      options: {},
    });
    const [repoPathTypeOptions, setRepoPathTypeOptions] = useState<Option>({
      options: {},
    });
    const [repoPathChecked, setRepoPathChecked] = useState(
      form.getFieldValue("repo2docker.repopath") !== "",
    );
    const [localStorageChecked, setLocalStorageChecked] = useState(
      form.getFieldValue("storage.localstoragepath") !== "",
    );
    return (
      <>
        <form.AppField
          name="repo2dockerdirectlink"
          validators={{
            onChangeListenTo: [
              "storage.localstoragepath",
              "repo2docker.repopath",
              "repo2docker.repopathtype",
              "repo2docker.repotype",
            ], // homeTriggerUpdateDirectLinks
            onChange: ({ value, fieldApi }) => {
              const repoType = fieldApi.form.getFieldValue(
                "repo2docker.repotype",
              ) as string;
              const repotype = repoType;
              const repoPath = fieldApi.form.getFieldValue(
                "repo2docker.repopath",
              ) as string;
              const repopath = repoPath;
              const repoRef = fieldApi.form.getFieldValue(
                "repo2docker.reporef",
              ) as string;
              let reporef = repoRef;
              const repoUrl = fieldApi.form.getFieldValue(
                "repo2docker.repourl",
              ) as string;
              let repourl = repoUrl;
              let urlPath = `/v2/${repoType}`;

              if (["git", "gl", "hydroshare", "ckan"].includes(repoType)) {
                repourl = encodeURIComponent(repourl);
              }
              repourl = shortenRepoUrl(repoType, repourl);
              urlPath = `${urlPath}/${repourl}/`;
              if (["git", "gl", "gh", "gist"].includes(repoType)) {
                reporef = reporef || "HEAD";
                urlPath = `${urlPath}${reporef}`;
              }
              const queryArgs = [];

              if (repoPathChecked) {
                const repopathtype = fieldApi.form.getFieldValue(
                  "repo2docker.repopathtype",
                );
                const urlprefix =
                  repopathtype == "file" ? "labpath" : "urlpath";
                const urlEE = encodeURIComponent(repoPath);
                queryArgs.push(`${urlprefix}=${urlEE}`);
              }
              const system = fieldApi.form.getFieldValue("system");
              queryArgs.push(`system=${system}`);

              const flavor = fieldApi.form.getFieldValue("flavor");
              //if (flavorElement.attr("data-collect") == "true") {
              queryArgs.push(`flavor=${flavor}`);
              //}

              const localstoragepathElement = fieldApi.form.getFieldValue(
                "storage.localstoragepath",
              ) as string;
              //if (localstoragepathElement.attr("data-collect") == "true") {
              const localestoragepath = encodeURIComponent(
                localstoragepathElement,
              );
              queryArgs.push(`localstoragepath=${localestoragepath}`);
              //}

              const queryString = queryArgs.join("&");
              urlPath = window.origin + `${urlPath}?${queryString}`;
              urlPath = urlPath.replace(/([^:]\/)\/+/g, "$1");

              fieldApi.setValue(urlPath, { dontValidate: true });
            },
          }}
        >
          {(field) => (
            <field.text
              label="Repo2Docker Direct Link"
              copy={true}
              enabled={false}
            />
          )}
        </form.AppField>
        <form.AppField
          name="repo2docker.repotype"
          listeners={{
            onMount: () => {
              setRepoTypeOptions({
                options: Object.fromEntries(
                  REPOTYPE.map((r) => [r.value, r.label]),
                ),
              });
            },
          }}
          // triggerOnChange: "homeTriggerRepoTypeChanged"
        >
          {(field) => (
            <field.select label="Repo Type" options={repoTypeOptions} />
          )}
        </form.AppField>
        <form.AppField
          name="repo2docker.repourl"
          validators={{
            onChangeListenTo: ["repo2docker.repotype"], // homeTriggerRepoUrl
            onChange: ({ value }) => {
              console.log(`Repo URL changed to: ${value}`);
              // triggerRegistry.useTrigger("homeTriggerRepoUrl");
            },
          }} //onInputChange: "repoUrlChanged"
        >
          {(field) => <field.text label="Repo URL" required={true} />}
        </form.AppField>
        <form.AppField name="repo2docker.reporef">
          {(field) => <field.text label="Repo Ref" />}
        </form.AppField>
        <form.AppField name="repo2docker.repopath">
          {(field) => (
            <>
              <field.textCheckbox
                label="Private Repo Path"
                checked={repoPathChecked}
                onCheckboxChange={setRepoPathChecked}
              />
            </>
          )}
        </form.AppField>
        {repoPathChecked && (
          <form.AppField
            name="repo2docker.repopathtype"
            listeners={{
              onMount: () => {
                setRepoPathTypeOptions({
                  options: Object.fromEntries(
                    REPOPATHTYPE.map((r) => [r.value, r.label]),
                  ),
                });
              },
            }}
          >
            {(field) => (
              <field.select
                label="Repo Path Type"
                options={repoPathTypeOptions}
              />
            )}
          </form.AppField>
        )}
        <form.AppField name="storage.localstoragepath">
          {(field) => (
            <field.textCheckbox
              label="Mount user data"
              checked={localStorageChecked}
              onCheckboxChange={setLocalStorageChecked}
            />
          )}
        </form.AppField>
      </>
    );
  },
});
