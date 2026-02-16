export interface FrontendConfig {
  services: ServicesConfig;
}

export interface ServicesConfig {
  default: string;
  options: Record<string, ServiceConfig>;
}

export interface ServiceConfig {
  fillingOrder: string[];
  navbar: Record<string, NavbarItem>;
  tabs: Record<string, TabConfig>;
}

export interface NavbarItem {
  show?: boolean;
  firstRow?: boolean;
  displayName: string;
  dependency?: Dependency;
  trigger?: Record<string, string>;
}

export interface TabConfig {
  center: Record<string, FieldConfig>;
  [key: string]: Record<string, FieldConfig>;
}

export interface FieldConfig {
  input: InputConfig;
  label?: LabelConfig;
  trigger?: Record<string, string>;
  triggerOnChange?: string;
  triggerSuffix?: string;
  onInput?: Record<string, string>;
  onInputChange?: string;
  observeAttribute?: Record<string, string>;
  dependency?: Dependency;
  options?: FieldLevelOptions;
}

export interface InputConfig {
  type: InputType;
  options?: InputOptions;
  values?: Record<string, string>;
  share_system_list?: string[];
  rtc_system_list?: string[];
  rtc_option_list?: string[];
}

export type InputType =
  | "text"
  | "select"
  | "hr"
  | "reservationinfo"
  | "flavorlegend"
  | "flavorinfo"
  | "storagegrow"
  | "storageentry"
  | "envvariablesentry"
  | "multiple_checkboxes";

export interface InputOptions {
  collect?: boolean;
  enabled?: boolean | "show";
  show?: boolean;
  credits?: boolean;
  copy?: boolean;
  secret?: boolean;
  required?: boolean;
  default?: boolean;
  group?: string;
  placeholder?: string;
  value?: string;
  pattern?: string;
  patternDisabled?: string;
}

export interface LabelConfig {
  type: LabelType;
  value: string;
  width?: number;
  icontext?: string;
  options?: LabelOptions;
}

export type LabelType =
  | "text"
  | "textcheckbox"
  | "texticoncheckbox"
  | "texticon"
  | "header";

export interface LabelOptions {
  default?: boolean;
}

export interface Dependency {
  system?: string[];
  option?: string[];
  repotype?: string[];
}

export interface FieldLevelOptions {
  group?: string;
  setName?: string;
}
