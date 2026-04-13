import { withForm } from "@/hooks/formContext";
import { useStore } from "@tanstack/react-form";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Checkbox, Label, Select } from "radix-ui";
import "../modules.css";
import { defaultFormValues } from "../shared";

export type ModuleConfig = {
  id: string;
  displayname: string;
  default: boolean;
  link: string;
  weight: number;
  versions: false | string[];
};

type ModuleFieldName =
  | "modules.communities"
  | "modules.extensions"
  | "modules.kernels"
  | "modules.proxies";

export const ModuleGroupForm = withForm({
  defaultValues: defaultFormValues,
  props: {
    name: "modules.communities" as ModuleFieldName,
    label: "",
    config: [] as ModuleConfig[],
  },
  render: function Render({ form, name, label, config }) {
    const [group, key] = name.split(".") as [
      "modules",
      keyof typeof form.state.values.modules,
    ];

    const selected = useStore(
      form.store,
      (state) => state.values[group][key] as string[],
    );
    const versionsMap = useStore(
      form.store,
      (state) => state.values.modules_versions,
    );

    const sorted = [...config].sort((a, b) => b.weight - a.weight);

    const toggle = (mod: ModuleConfig) => {
      const current = selected ?? [];
      if (current.includes(mod.id)) {
        form.setFieldValue(
          name as any,
          current.filter((x) => x !== mod.id),
        );
        if (`${key}_${mod.id}` in versionsMap) {
          const { [mod.id]: _, ...rest } = versionsMap;
          form.setFieldValue("modules_versions", rest);
        }
      } else {
        form.setFieldValue(name as any, [...current, mod.id]);
        if (mod.versions && mod.versions.length > 0) {
          form.setFieldValue("modules_versions", {
            ...versionsMap,
            [`${key}_${mod.id}`]: [mod.versions[0]],
          });
        }
      }
    };

    const setVersion = (id: string, version: string) => {
      // Slice the everything before _
      const baseID = `${key}_${id}`;
      form.setFieldValue("modules_versions", {
        ...versionsMap,
        [baseID]: [version],
      });
    };

    const isChecked = (id: string) => (selected ?? []).includes(id);
    const getSelectedVersion = (id: string) =>
      versionsMap[`${key}_${id}`]?.[0] ?? "";

    return (
      <fieldset className="module-group">
        <legend>{label}</legend>
        {sorted.map((mod) => {
          const checked = isChecked(mod.id);
          const checkboxId = `module-${name}-${mod.id}`;

          return (
            <div key={mod.id} className="multiple-checkboxes__item">
              <Checkbox.Root
                id={checkboxId}
                checked={checked}
                onCheckedChange={() => toggle(mod)}
                className="multiple-checkboxes__checkbox"
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <Label.Root htmlFor={checkboxId}>{mod.displayname}</Label.Root>

              <a
                href={mod.link}
                target="_blank"
                rel="noopener noreferrer"
                title={`More info about ${mod.displayname}`}
                aria-label={`More info about ${mod.displayname}`}
              >
                <InfoCircledIcon />
              </a>

              {mod.versions && mod.versions.length > 0 && (
                <Select.Root
                  disabled={!checked}
                  value={getSelectedVersion(mod.id)}
                  onValueChange={(v) => setVersion(mod.id, v)}
                >
                  <Select.Trigger
                    className="module-row__select-trigger"
                    aria-label={`${mod.displayname} version`}
                  >
                    <Select.Value placeholder="Select version…" />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="module-row__select-content">
                      <Select.ScrollUpButton>
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      <Select.Viewport>
                        {mod.versions.map((v) => (
                          <Select.Item
                            key={v}
                            value={v}
                            className="module-row__select-item"
                          >
                            <Select.ItemText>{v}</Select.ItemText>
                            <Select.ItemIndicator>
                              <CheckIcon />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      <Select.ScrollDownButton>
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              )}
            </div>
          );
        })}
      </fieldset>
    );
  },
});
