import { withForm } from "@/hooks/formContext";

export const CustomDockerForm = withForm({
  defaultValues: {
    "custom.customimage": "",
    "custom.privaterepo": "",
    "custom.privaterepousername": "",
    "custom.privaterepopassword": "",
    "storage.localstoragepath": "",
  },
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="custom.customimage">
          {(field) => <field.text label="Custom Image" />}
        </form.AppField>
        <form.AppField name="custom.privaterepo">
          {(field) => <field.text label="Private Repo" />}
        </form.AppField>
        <form.Subscribe selector={(state) => state.values.custom?.privaterepo}>
          {(privaterepo) => (
            <>
              {privaterepo && (
                <>
                  <form.AppField
                    name="custom.privaterepousername"
                    validators={{
                      onChangeListenTo: ["custom.privaterepo"], // privaterepo : toggleexternalCB
                      onChange: ({ value }) => {
                        console.log(
                          `Private Repo Username changed to: ${value}`,
                        );
                        // triggerRegistry.useTrigger("toggleExternalRepoFields");
                      },
                    }}
                  >
                    {(field) => <field.text label="Private Repo Username" />}
                  </form.AppField>
                  <form.AppField
                    name="custom.privaterepopassword"
                    validators={{
                      onChangeListenTo: ["custom.privaterepo"], // privaterepo : toggleexternalCB
                      onChange: ({ value }) => {
                        console.log(
                          `Private Repo Password changed to: ${value}`,
                        );
                        // triggerRegistry.useTrigger("toggleExternalRepoFields");
                      },
                    }}
                  >
                    {(field) => (
                      <field.text label="Private Repo Password" secret={true} />
                    )}
                  </form.AppField>
                </>
              )}
            </>
          )}
        </form.Subscribe>
        <form.AppField name="storage.localstoragepath">
          {(field) => <field.text label="Local Storage Path" />}
        </form.AppField>
      </>
    );
  },
});
