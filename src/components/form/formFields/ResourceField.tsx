import { useFieldContext } from "@/hooks/formContext";
import { CopyIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import "../text.css";
import "../label.css";
import LabelField from "./LabelField";
import { useConfigStore } from "@/stores/jupyterStore";

interface ResourceFieldProps {
  label: string;
  required?: boolean;
  enabled?: boolean;
  placeholder?: string;
  secret?: boolean;
  copy?: boolean;
  pattern?: string;
  warning?: string;
}

function ResourceField({
  label,
  required = false,
  enabled,
  placeholder,
  secret = false,
  copy = false,
  pattern,
  warning,
}: ResourceFieldProps) {
  const field = useFieldContext<string>();
  const fieldName = field.name.split(".").slice(-1)[0];
  const isSecret = !!secret;
  const isCopy = !!copy;
  const [labelText, setLabelText] = useState(label);
  const [showPassword, setShowPassword] = useState(false);
  const [min, setMin] = useState(-1);
  const [max, setMax] = useState(-1);
  const [defaultValue, setDefaultValue] = useState(1);
  const [show, setShow] = useState(false);

  const resourcesConfig = useConfigStore(
    (s) => s.frontendCollection.resourcesConfig,
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(field.state.value);
  }, [field.state.value]);

  const hasGroup = isSecret || isCopy;

  useEffect(() => {
    const system = field.form.getFieldValue("system");
    const partition = field.form.getFieldValue("hpc.partition");
    const systems = system ? [system] : [];
    const partitions = partition ? [partition] : [];
    let _partitions = [];

    let minmaxavail = false;
    const collectInformation = true;

    if (collectInformation) {
      systems.forEach((system: string) => {
        if (partitions.length === 1 && partitions[0] === "_all_") {
          _partitions = Object.keys(resourcesConfig[system] ?? {});
        } else {
          _partitions = partitions;
        }
        _partitions.forEach((partition: string) => {
          const elementOptions =
            resourcesConfig[system]?.[partition]?.[fieldName] ?? {};
          if (Object.keys(elementOptions).length !== 0) {
            setShow(true);
            const minmax = elementOptions.minmax || false;
            setDefaultValue(
              elementOptions["default"] === undefined ||
                elementOptions["default"] === null
                ? defaultValue
                : elementOptions["default"],
            );
            if (minmax) {
              if (!minmaxavail) {
                minmaxavail = true;
                setMin(minmax[0]);
                setMax(minmax[1]);
              } else {
                if (minmax[0] < min) {
                  setMin(minmax[0]);
                }
                if (minmax[1] > max) {
                  setMax(minmax[1]);
                }
              }
            }
          }
        });
      });
    }
    if (show) {
      if (!collectInformation) {
        console.log("defaultValue: ", defaultValue);
        setLabelText(`${label} [${defaultValue}]`);
        //invalidFeedback.html(
        //  `Value ${defaultValue} was chosen by workshop instructor.`,
        //);
      } else if (minmaxavail) {
        console.log("min: ", min, "max: ", max);
        setLabelText(`${label} [${min}, ${max}]`);
        //invalidFeedback.html(
        // `Please choose a number between ${min} and ${max}.`,
        // );
      } else {
        // invalidFeedback.html("Please choose a valid number.");
        // inputElement.removeAttr("min");
        // inputElement.removeAttr("max");
      }
      // if (inputElement.attr("data-alwaysdisabled") != "true") {
      //   inputElement.attr("value", defaultValue);
      // }

      //   labelElement
      //     .contents()
      //     .filter(function () {
      //       return this.nodeType === Node.TEXT_NODE;
      //     })
      //     .first()
      //     .replaceWith(label);

      //   // Checkbox logic
      //   const checkBoxElement = labelElement.find("input[type='checkbox']");
      //   if (checkBoxElement.length !== 0) {
      //     const checkBoxDefault = labelOptions?.options?.default ?? false;
      //     checkBoxElement.prop("checked", checkBoxDefault);
      //     inputElement.prop("disabled", !checkBoxDefault);
      //   } else {
      //     if (inputElement.attr("data-alwaysdisabled") != "true") {
      //       inputElement.prop("disabled", false);
      //     }
      //   }
      //   inputDiv.show();
      //   if (labelElementCBValue !== undefined) {
      //     inputElement.attr("data-collect", labelElementCBValue);
      //   } else {
      //     inputElement.attr("data-collect", true);
      //   }
      // } else {
      //   inputDiv.hide();
      //   inputElement.attr("data-collect", false);
    }
  });
  const handlechange = (value: string) => {
    field.handleChange(value);
  };
  if (!show) return null;
  console.log("ResourceField render: ", labelText);
  return (
    <div className="text-input">
      <LabelField label={labelText} htmlFor={label} />

      <div className="text-input__field-wrapper">
        {hasGroup ? (
          <div className="text-input__input-group">
            {isSecret && (
              <button
                type="button"
                className="text-input__toggle-btn"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            )}
            {isCopy && (
              <button
                type="button"
                className="text-input__copy-btn"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                title="Copy to clipboard"
              >
                <CopyIcon />
              </button>
            )}
          </div>
        ) : (
          <input
            type="number"
            min={min}
            max={max}
            className={"text-input__input"}
            defaultValue={defaultValue}
            name={label}
            value={field.state.value}
            placeholder={placeholder ?? ""}
            pattern={pattern}
            required={required}
            disabled={enabled === false}
            onChange={(e) => handlechange(e.target.value)}
          />
        )}
        {warning && <div className="text-input__validation">{warning}</div>}
      </div>
    </div>
  );
}

export default ResourceField;
