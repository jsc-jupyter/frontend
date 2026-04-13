/** Shared types for element components extracted from legacy tcCreateElement. */

// TODO: Change to Zustand where possible

export interface LabelOptions {
  type?: string;
  value?: string;
  width?: string;
  options?: Record<string, unknown>;
  icontext?: string;
}

export interface InputOptions {
  name?: string;
  value?: string | number | boolean;
  defaultValue?: string | number | boolean;
  options?: Record<string, string>;
  inactiveOptions?: Record<string, string>;
  inactiveText?: string;
  groups?: Record<string, number>;
  multiple?: boolean;
  emptyOpt?: string;
  visible?: boolean;
  enabled?: boolean;
  required?: boolean;
  [key: string]: unknown;
}

export interface ElementInput {
  type?: string;
  options?: InputOptions;
  values?: Record<string, string>;
}

export interface ElementOptions {
  label?: LabelOptions;
  input?: ElementInput;
  dependency?: Record<string, string[]>;
  trigger?: Record<string, unknown>;
}

export interface BaseElementProps {
  serviceId: string;
  rowId: string;
  tabId: string;
  elementId: string;
  elementOptions: ElementOptions;
}

export interface FormFieldProps extends BaseElementProps {
  form: any;
}

export interface ButtonConfig {
  name: string;
  show?: boolean;
  text?: string;
  textFirst?: boolean;
  alignRight?: boolean;
  firstRow?: boolean;
  defaultRow?: boolean;
  dependency?: Record<string, string[]>;
}

export type ElementType =
  | "text"
  | "textarea"
  | "textlink"
  | "storageentry"
  | "envvariablesentry"
  | "textgrower"
  | "label"
  | "date"
  | "number"
  | "checkbox"
  | "buttons"
  | "select"
  | "reservationinfo"
  | "flavorlegend"
  | "flavorinfo"
  | "multiple_checkboxes"
  | "selecthelper"
  | "logcontainer"
  | "hr";
