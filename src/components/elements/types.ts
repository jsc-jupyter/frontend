/** Shared types for element components extracted from legacy tcCreateElement. */

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
  placeholder?: string;
  pattern?: string;
  warning?: string;
  required?: boolean;
  enabled?: boolean;
  secret?: boolean;
  copy?: boolean;
  rows?: number;
  show?: boolean;
  default?: boolean;
  credits?: boolean;
  buttons?: string[];
  title?: string;
  multiple?: boolean;
  size?: number;
  href?: string;
  text?: string;
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
