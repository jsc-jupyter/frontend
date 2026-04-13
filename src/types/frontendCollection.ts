import { FormType } from "@/components/form/shared";

type PartitionSystems =
  | "juwels"
  | "juwels_booster"
  | "juwels_gpus"
  | "jureca-dc_cpu"
  | "jureca-dc_gpu"
  | "jusuf_gpus"
  | "deep_cpu";

type Systems = "deep" | "jsccloud" | "jupyter" | "jureca" | "jusuf" | "juwels";

type moduleType = "communities" | "extensions" | "kernels" | "proxies";

type requestKwargs = {
  connect_timeout: number;
  request_timeout: number;
  validate_cwert: boolean;
};

type BackendServiceURLs = {
  services: string;
  usercredits: string;
  logs?: string;
  restart?: string;
  tunnel?: string;
};

type BackendService = {
  name: string;
  flavorsRequired: boolean;
  mapping: string;
  namespace?: string;
  poll: boolean;
  pollInterval: number;
  pollIntervalRandomizer: number;
  requestKwargs: requestKwargs;
  sendAccessToken: boolean;
  sendAcessTokenKey: string;
  type: string;
  urls: BackendServiceURLs;
  userflavors: boolean;
  userflavorsRequestKwargs: requestKwargs;
};

type StorageBase = {
  id: number;
  template: string;
  relativeMountPath: string;
  readOnly: boolean;
  username: string;
  password: string;
};

type B2Drop = StorageBase & {
  path: string;
};

type AWS = StorageBase & {
  bucketName: string; // AWS/S3 Only
  region: string; // AWS/S3 Only
};

type S3CompatibleProvider = StorageBase & {
  providerName: string; // unique
  bucketName: string; // AWS/S3 Only
  endpoint: string; // unique
  region: string; // AWS/S3 Only
};

type Webdav = StorageBase & {
  path: string;
  url: string;
  vendor: string;
  bearerToken: string;
};

export type Storage = B2Drop | AWS | S3CompatibleProvider | Webdav;

type Module = {
  [type in moduleType]: string[];
};

type decrypted_user_options = {
  [id: string]: {
    hpc?: {
      account: string;
      partition: string;
      project: string;
    };
    name: string;
    service: string;
    system: string;
    option: string;
    profile: string;
    flavor: string;
    workshop_id: boolean;
    modules: Module;
    module_versions: {
      [name: string]: string[];
    };
    secret_keys: {
      [name: string]: string;
    };
    envvariables: {
      [name: string]: string;
    };
    resources: {
      [key: string]: number;
    };
    //datamount-x which is storage but wait till change in structure
  };
};

type defaultPartitions = {
  [key in PartitionSystems]: string[];
};

type FileLogger = {
  enabled: boolean;
  level: string;
  formatter: string;
  filename: string;
  when: string;
  interval: number;
  backupCount: number;
  encoding: string;
  delay: boolean;
  utc: boolean;
  atTime: string;
  errors: boolean;
};

type StreamLogger = {
  enabled: boolean;
  level: string;
  formatter: string;
  stream: string;
};

type SyslogLogger = {
  enabled: boolean;
  level: string;
  formatter: string;
  address: string | [string, number];
  socktype: string;
};

type SmtpLogger = {
  enabled: boolean;
  level: string;
  formatter: string;
  mailhost: string | [string, number];
  fromaddr: string;
  toaddrs: string[];
  subject: string;
  secure: boolean | [string, number, string];
  timeout: number;
};

type IncidentCheck = {
  healthThreshold: {
    compute: number;
    interactive: number;
  };
  interval: number;
  logger: FileLogger | StreamLogger | SyslogLogger | SmtpLogger;
  loggerName: string;
  services: {
    [key: string]: number;
  };
  url: string;
};

type Incidents = {
  // Systems
  [key in Uppercase<Systems>]: {
    health: number;
    incident: string;
  };
};

type MapPartitions = {
  [key: string]: string;
};

type MapSystems = {
  [key: string]: string;
};

type reservation = {
  Accounts: string;
  BurstBuffer: string;
  CoreCnt: string;
  Duration: string;
  EndTime: string;
  Features: string;
  Flags: string;
  Groups: string;
  Licenses: string;
  MaxStartDelay: string;
  NodeCnt: string;
  Nodes: string;
  PartitionName: string;
  ReservationName: string;
  StartTime: string;
  State: string;
  "TRES=cpu": string;
  Users: string[];
};

type Reservations = {
  // Systems
  [key in Uppercase<Systems>]: reservation[];
};

type minMax = {
  min: number;
  max: number;
};

type XServer = {
  checkbox: boolean;
  checkbox_label: string;
  default: boolean;
  default_checkbox: boolean;
  label: string;
  minmax: minMax;
};

type resourcesConfig = {
  // Systems without jsccloud
  [key in Uppercase<Systems>]: {
    [key: string]: {
      nodes: { default: number; minmax: minMax };
      runtime: { default: number; minmax: minMax };
      gpus: { default: number; minmax: minMax };
      xserver: XServer;
    };
  };
};

type allowedList = {
  groups: string[];
  systems: string[];
};

type serviceOption = {
  name: string;
  communitySet?: string;
  extensionSet?: string;
  kernelSet?: string;
  proxySet?: string;
  allowedLists: allowedList;
  mapping: string;
  weight: number;
};

type options = { [key: string]: serviceOption };

type serviceConfig = {
  jupyterlab: {
    allowedGroups: string[];
    defaultOption: string;
    optionsName: string;
    serviceID: string;
    options: options;
  };
};

type SystemConfig = {
  // Systems with jsccloud but jsccloud has a dash in the name
  // TODO: Account for the dash
  [key in Uppercase<Systems>]: {
    backendService: string;
    interactivePartitions: string[];
    maxPerUser: { default: number };
    weight: number;
  };
};

type UserModules = {
  [type in moduleType]: {
    [name: string]: {
      default: boolean;
      href: string;
      displayName: string;
      weight: number;
      interactiveOnly: boolean;
      computeOnly: boolean;
      sets: string[];
      allowedSystems: string[];
      options: string[];
    };
  };
};

type FrontendCollection = {
  backendServices: BackendService[];
  decrypted_user_options: decrypted_user_options;
  defaultPartitions: defaultPartitions;
  hostname: string;
  incidentCheck: IncidentCheck;
  incidents: Incidents;
  mapPartitions: MapPartitions;
  mapSystems: MapSystems;
  reservations: Reservations;
  resourcesConfig: resourcesConfig;
  serviceConfig: serviceConfig;
  systemConfig: SystemConfig;
  userModules: UserModules;
  userAge: string;
};

export type {
  FrontendCollection,
  BackendService,
  decrypted_user_options,
  defaultPartitions,
  IncidentCheck,
  Incidents,
  MapPartitions,
  MapSystems,
  Reservations,
  resourcesConfig,
  serviceConfig,
  SystemConfig,
  UserModules,
  moduleType,
};
