import React from "react";
import type { BaseElementProps, ElementType } from "../types";

import TextInput from "../TextInput/TextInput";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextLink from "../TextLink/TextLink";
import StorageEntry from "../StorageEntry/StorageEntry";
import EnvVariablesEntry from "../EnvVariablesEntry/EnvVariablesEntry";
import TextGrower from "../TextGrower/TextGrower";
import LabelOnly from "../LabelOnly/LabelOnly";
import DateInput from "../DateInput/DateInput";
import NumberInput from "../NumberInput/NumberInput";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import ActionButtons from "../ActionButtons/ActionButtons";
import SelectInput from "../SelectInput/SelectInput";
import ReservationInfo from "../ReservationInfo/ReservationInfo";
import FlavorLegend from "../FlavorLegend/FlavorLegend";
import FlavorInfo from "../FlavorInfo/FlavorInfo";
import MultipleCheckboxes from "../MultipleCheckboxes/MultipleCheckboxes";
import SelectHelper from "../SelectHelper/SelectHelper";
import LogContainer from "../LogContainer/LogContainer";
import HorizontalRule from "../HorizontalRule/HorizontalRule";

interface ElementRendererProps extends BaseElementProps {
  isFirstRow?: boolean;
  /** Generic change callback forwarded to the rendered element component. */
  onChange?: (value: unknown) => void;
}

/**
 * Factory component that renders the correct element based on `elementOptions.input.type`.
 * Replaces the legacy `tcCreateElement` switch statement.
 */
const ElementRenderer: React.FC<ElementRendererProps> = (props) => {
  const type = (props.elementOptions.input?.type ?? "") as ElementType;

  switch (type) {
    case "text":
      return <TextInput {...props} />;

    case "textarea":
      return <TextAreaInput {...props} />;

    case "textlink":
      return <TextLink {...props} />;

    case "storageentry":
      return <StorageEntry {...props} />;

    case "envvariablesentry":
      return <EnvVariablesEntry {...props} />;

    case "textgrower":
      return <TextGrower {...props} />;

    case "label":
      return <LabelOnly {...props} />;

    case "date":
      return <DateInput {...props} />;

    case "number":
      return <NumberInput {...props} />;

    case "checkbox":
      return <CheckboxInput {...props} />;

    case "buttons":
      return <ActionButtons {...props} isFirstRow={props.isFirstRow} />;

    case "select":
      return <SelectInput {...props} />;

    case "reservationinfo":
      return <ReservationInfo {...props} />;

    case "flavorlegend":
      return <FlavorLegend />;

    case "flavorinfo":
      return <FlavorInfo {...props} />;

    case "multiple_checkboxes":
      return <MultipleCheckboxes {...props} />;

    case "selecthelper":
      return <SelectHelper {...props} />;

    case "logcontainer":
      return <LogContainer {...props} />;

    case "hr":
      return <HorizontalRule />;

    default:
      return null;
  }
};

export default ElementRenderer;
