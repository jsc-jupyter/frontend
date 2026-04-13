import { withForm } from "@/hooks/formContext";
import { defaultFormValues } from "../shared";

export const ResourcesForm = withForm({
  defaultValues: defaultFormValues,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="resources.nodes"
          listeners={{
            onBlur: () => {
              //TODO : Get Min Max from Field or set it directly in the form schema
            },
          }}
        >
          {(field) => <field.resource label="Nodes" />}
        </form.AppField>
        <form.AppField name="resources.runtime">
          {(field) => <field.resource label="Runtime (minutes)" />}
        </form.AppField>
        <form.AppField name="resources.gpus">
          {(field) => <field.resource label="GPUs" />}
        </form.AppField>
        <form.AppField name="resources.xserver">
          {(field) => <field.resource label="Use XServer GPU index" />}
        </form.AppField>
      </>
    );
  },
});
