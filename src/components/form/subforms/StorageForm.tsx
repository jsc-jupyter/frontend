import { withForm } from "@/hooks/formContext";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import "../select.css";
import {
  StorageSchema,
  TemplateOptions,
  VendorOptions,
} from "@/components/form/shared";
import * as z from "zod";
import { Collapsible } from "radix-ui";
import { useState } from "react";

interface Option {
  options: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
}

const defaultb2drop: z.input<typeof StorageSchema> = {
  template: "b2drop",
  relativemountpath: "",
  readonly: false,
  path: "",
  user: "",
  obscure_pass: "",
};

const defaultAWS: z.input<typeof StorageSchema> = {
  template: "aws",
  relativemountpath: "",
  readonly: false,
  bucketname: "",
  region: "",
  username: "",
  obscure_pass: "",
};

const defaultS3: z.input<typeof StorageSchema> = {
  template: "s3compatible",
  relativemountpath: "",
  readonly: false,
  providername: "",
  bucketname: "",
  endpoint: "",
  username: "",
  obscure_pass: "",
  region: "",
};

const defaultWebdav: z.input<typeof StorageSchema> = {
  template: "webdav",
  relativemountpath: "",
  readonly: false,
  path: "",
  url: "",
  vendor: "",
  user: "",
  obscure_pass: "",
  bearertoken: "",
};

export const StorageForm = withForm({
  defaultValues: {
    storage: {
      mounts: [defaultb2drop, defaultAWS, defaultS3, defaultWebdav],
      localstorage: "",
    },
  },
  render: function Render({ form }) {
    const [templateOptions, setTemplateOptions] = useState<Option>({
      options: {},
    });
    const [vendorOptions, setVendorOptions] = useState<Option>({
      options: {},
    });
    const handleAdd = () => {
      form.pushFieldValue("storage.mounts", defaultb2drop);
    };

    return (
      <div className="env-variables-entry">
        <div className="env-variables-entry__header">
          <span className="env-variables-entry__header-text">
            Add Storage Mount
          </span>
          <button
            type="button"
            className="env-variables-entry__add-btn"
            aria-label="Add environment variable"
            onClick={handleAdd}
          >
            <PlusIcon />
          </button>
        </div>

        <form.AppField name="storage.mounts" mode="array">
          {(field) => {
            return (
              <>
                {field.state.value.length > 0 && (
                  <table className="env-variables-entry__table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Template</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {field.state.value.map((_, i) => {
                        return (
                          <Collapsible.Root
                            key={i}
                            style={{ backgroundColor: "darkgray" }}
                            asChild
                          >
                            <tr key={i}>
                              <Collapsible.Trigger asChild>
                                <tr style={{ WebkitAppearance: "unset" }}>
                                  <td />
                                  <td> {"Template Value"} </td>
                                  <td style={{ textAlign: "center" }}>
                                    <button
                                      type="button"
                                      className="env-variables-entry__remove-btn"
                                      onClick={() => field.removeValue(i)}
                                      aria-label="Remove variable"
                                    >
                                      <TrashIcon />
                                    </button>
                                  </td>
                                </tr>
                              </Collapsible.Trigger>
                              <Collapsible.Content asChild>
                                <tr style={{ width: "100%" }}>
                                  <td colSpan={3}>
                                    <form.AppField
                                      key={i}
                                      name={`storage.mounts[${i}].template`}
                                      listeners={{
                                        onMount: () => {
                                          setTemplateOptions({
                                            options: Object.fromEntries(
                                              TemplateOptions.map((r) => [
                                                r.value,
                                                r.label,
                                              ]),
                                            ),
                                          });
                                        },
                                      }}
                                    >
                                      {(subfield) => (
                                        <subfield.select
                                          label="Read Only"
                                          options={templateOptions}
                                        />
                                      )}
                                    </form.AppField>
                                    <form.Subscribe
                                      selector={(state) =>
                                        state.values.storage.mounts?.[i]
                                          .template
                                      }
                                    >
                                      {(template) => (
                                        <>
                                          {template === "b2drop" && (
                                            <>
                                              <form.AppField
                                                name={`storage.mounts[${i}].relativemountpath`}
                                                listeners={{
                                                  onMount: ({ fieldApi }) => {
                                                    fieldApi.form.setFieldValue(
                                                      `storage.mounts[${i}].relativemountpath`,
                                                      template,
                                                    );
                                                  },
                                                }}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Relative Mount Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].readonly`}
                                              >
                                                {(subfield) => (
                                                  <subfield.checkbox label="Read Only" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].path`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].user`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Username" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].obscure_pass`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text
                                                    label="Password"
                                                    secret={true}
                                                  />
                                                )}
                                              </form.AppField>
                                            </>
                                          )}
                                          {template === "aws" && (
                                            <>
                                              <form.AppField
                                                name={`storage.mounts[${i}].relativemountpath`}
                                                listeners={{
                                                  onMount: ({ fieldApi }) => {
                                                    fieldApi.form.setFieldValue(
                                                      `storage.mounts[${i}].relativemountpath`,
                                                      template,
                                                    );
                                                  },
                                                }}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Relative Mount Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].readonly`}
                                              >
                                                {(subfield) => (
                                                  <subfield.checkbox label="Read Only" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].bucketname`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Bucket Name" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].region`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Region" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].username`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Username" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].obscure_pass`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text
                                                    label="Password"
                                                    secret={true}
                                                  />
                                                )}
                                              </form.AppField>
                                            </>
                                          )}
                                          {template === "s3compatible" && (
                                            <>
                                              <form.AppField
                                                name={`storage.mounts[${i}].relativemountpath`}
                                                listeners={{
                                                  onMount: ({ fieldApi }) => {
                                                    fieldApi.form.setFieldValue(
                                                      `storage.mounts[${i}].relativemountpath`,
                                                      template,
                                                    );
                                                  },
                                                }}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Relative Mount Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].readonly`}
                                              >
                                                {(subfield) => (
                                                  <subfield.checkbox label="Read Only" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].providername`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Provider" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].bucketname`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Bucket Name" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].endpoint`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Endpoint" />
                                                )}
                                              </form.AppField>

                                              <form.AppField
                                                name={`storage.mounts[${i}].username`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Username" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].obscure_pass`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text
                                                    label="Password"
                                                    secret={true}
                                                  />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].region`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Region" />
                                                )}
                                              </form.AppField>
                                            </>
                                          )}
                                          {template === "webdav" && (
                                            <>
                                              <form.AppField
                                                name={`storage.mounts[${i}].relativemountpath`}
                                                listeners={{
                                                  onMount: ({ fieldApi }) => {
                                                    fieldApi.form.setFieldValue(
                                                      `storage.mounts[${i}].relativemountpath`,
                                                      template,
                                                    );
                                                  },
                                                }}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Relative Mount Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].readonly`}
                                              >
                                                {(subfield) => (
                                                  <subfield.checkbox label="Read Only" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].path`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Path" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].url`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="URL" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].vendor`}
                                                listeners={{
                                                  onMount: () => {
                                                    setVendorOptions({
                                                      options:
                                                        Object.fromEntries(
                                                          VendorOptions.map(
                                                            (r) => [
                                                              r.value,
                                                              r.label,
                                                            ],
                                                          ),
                                                        ),
                                                    });
                                                  },
                                                }}
                                              >
                                                {(subfield) => (
                                                  <subfield.select
                                                    label="Vendor"
                                                    options={vendorOptions}
                                                  />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].user`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Username" />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].obscure_pass`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text
                                                    label="Password"
                                                    secret={true}
                                                  />
                                                )}
                                              </form.AppField>
                                              <form.AppField
                                                name={`storage.mounts[${i}].bearertoken`}
                                              >
                                                {(subfield) => (
                                                  <subfield.text label="Bearer Token" />
                                                )}
                                              </form.AppField>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </form.Subscribe>
                                  </td>
                                </tr>
                              </Collapsible.Content>
                            </tr>
                          </Collapsible.Root>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            );
          }}
        </form.AppField>
      </div>
    );
  },
});
