import { componentRegistry } from "./componentRegistry";

// Element components
import TextInput from "@/components/elements/TextInput/TextInput";
import TextAreaInput from "@/components/elements/TextAreaInput/TextAreaInput";
import TextLink from "@/components/elements/TextLink/TextLink";
import StorageEntry from "@/components/elements/StorageEntry/StorageEntry";
import EnvVariablesEntry from "@/components/elements/EnvVariablesEntry/EnvVariablesEntry";
import TextGrower from "@/components/elements/TextGrower/TextGrower";
import LabelOnly from "@/components/elements/LabelOnly/LabelOnly";
import DateInput from "@/components/elements/DateInput/DateInput";
import NumberInput from "@/components/elements/NumberInput/NumberInput";
import CheckboxInput from "@/components/elements/CheckboxInput/CheckboxInput";
import ActionButtons from "@/components/elements/ActionButtons/ActionButtons";
import SelectInput from "@/components/elements/SelectInput/SelectInput";
import ReservationInfo from "@/components/elements/ReservationInfo/ReservationInfo";
import FlavorLegend from "@/components/elements/FlavorLegend/FlavorLegend";
import FlavorInfo from "@/components/elements/FlavorInfo/FlavorInfo";
import MultipleCheckboxes from "@/components/elements/MultipleCheckboxes/MultipleCheckboxes";
import SelectHelper from "@/components/elements/SelectHelper/SelectHelper";
import LogContainer from "@/components/elements/LogContainer/LogContainer";
import HorizontalRule from "@/components/elements/HorizontalRule/HorizontalRule";

// Trigger registration
import { registerHomeTriggers } from "@/triggers/homeTriggers";

function registerComponents() {
  // Input types matching ElementType + InputType unions
  componentRegistry.register("text", TextInput);
  componentRegistry.register("textarea", TextAreaInput);
  componentRegistry.register("textlink", TextLink);
  componentRegistry.register("storageentry", StorageEntry);
  componentRegistry.register("envvariablesentry", EnvVariablesEntry);
  componentRegistry.register("textgrower", TextGrower);
  componentRegistry.register("storagegrow", TextGrower); // storagegrow uses TextGrower
  componentRegistry.register("label", LabelOnly);
  componentRegistry.register("date", DateInput);
  componentRegistry.register("number", NumberInput);
  componentRegistry.register("checkbox", CheckboxInput);
  componentRegistry.register("buttons", ActionButtons);
  componentRegistry.register("select", SelectInput);
  componentRegistry.register("reservationinfo", ReservationInfo);
  componentRegistry.register("flavorlegend", FlavorLegend);
  componentRegistry.register("flavorinfo", FlavorInfo);
  componentRegistry.register("multiple_checkboxes", MultipleCheckboxes);
  componentRegistry.register("selecthelper", SelectHelper);
  componentRegistry.register("logcontainer", LogContainer);
  componentRegistry.register("hr", HorizontalRule);
}
let initialised = false;

export function registerAll() {
  if (initialised) return;
  registerComponents();
  registerHomeTriggers();
  initialised = true;
}
