import { withForm } from "@/hooks/formContext";
import { defaultFormValues } from "../shared";
import { useState } from "react";

export const CustomDockerForm = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    const [privateRepoChecked, setPrivateRepoChecked] = useState(
      form.getFieldValue("custom.privaterepo") !== undefined,
    );
    const [localStorageChecked, setLocalStorageChecked] = useState(
      form.getFieldValue("storage.localstoragepath") !== "",
    );
    return (
      <>
        <form.AppField name="custom.customimage">
          {(field) => <field.text label="Custom Image" />}
        </form.AppField>
        <form.AppField name="custom.privaterepo">
          {(field) => (
            <field.textCheckbox
              label="Private image registry"
              checked={privateRepoChecked}
              onCheckboxChange={(checked) => {
                setPrivateRepoChecked(checked);
              }}
            />
          )}
        </form.AppField>
        <form.Subscribe selector={(state) => state.values.custom?.privaterepo}>
          {privateRepoChecked && (
            <>
              <form.AppField name="custom.privaterepousername">
                {(field) => <field.text label="Private Repo Username" />}
              </form.AppField>
              <form.AppField name="custom.privaterepopassword">
                {(field) => (
                  <field.text label="Private Repo Password" secret={true} />
                )}
              </form.AppField>
            </>
          )}
        </form.Subscribe>
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
