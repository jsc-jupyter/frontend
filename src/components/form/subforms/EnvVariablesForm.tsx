import { withForm } from "@/hooks/formContext";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import "../envForm.css";

export const EnvVariablesForm = withForm({
  defaultValues: {
    envvariables: [{ name: "", value: "" }],
  },
  render: function Render({ form }) {
    const handleAdd = () => {
      form.pushFieldValue("envvariables", { name: "", value: "" });
    };

    return (
      <div className="env-variables-entry">
        <div className="env-variables-entry__header">
          <span className="env-variables-entry__header-text">
            Add Environment Variables
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

        <form.AppField name="envvariables" mode="array">
          {(field) => {
            return (
              <>
                {field.state.value.length > 0 && (
                  <table className="env-variables-entry__table">
                    <thead>
                      <tr>
                        <th>Variable Name</th>
                        <th>Variable Value</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {field.state.value.map((_, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <form.AppField
                                key={i}
                                name={`envvariables[${i}].name`}
                              >
                                {(subField) => {
                                  return (
                                    <input
                                      value={subField.state.value}
                                      className="env-variables-entry__input"
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                    />
                                  );
                                }}
                              </form.AppField>
                            </td>
                            <td>
                              <form.AppField name={`envvariables[${i}].value`}>
                                {(subField) => {
                                  return (
                                    <input
                                      value={subField.state.value}
                                      className="env-variables-entry__input"
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                    />
                                  );
                                }}
                              </form.AppField>
                            </td>
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
