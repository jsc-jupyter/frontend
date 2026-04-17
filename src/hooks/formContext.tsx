import { createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

import { createFormHook } from "@tanstack/react-form";
import SelectField from "@/components/form/formFields/SelectField";
import TextField from "@/components/form/formFields/TextField";
import ResourceField from "@/components/form/formFields/ResourceField";
import { StartButton } from "@/components/form/formButtons/StartButton";
import CheckboxField from "@/components/form/formFields/CheckboxField";
import { UrlButton } from "@/components/form/formButtons/UrlButton";
import { ResetButton } from "@/components/form/formButtons/ResetButton";
import TextCheckboxField from "@/components/form/formFields/TextCheckboxField";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    text: TextField,
    select: SelectField,
    resource: ResourceField,
    checkbox: CheckboxField,
    textCheckbox: TextCheckboxField,
  },
  formComponents: {
    start: StartButton,
    url: UrlButton,
    reset: ResetButton,
  },
});
