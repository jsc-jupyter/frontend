import * as z from "zod";

export const REPOTYPE = [
  { value: "gh", label: "GitHub" },
  { value: "git", label: "Git repository" },
  { value: "gl", label: "GitLab" },
  { value: "gist", label: "GitHub Gist" },
  { value: "zenodo", label: "Zenodo DOI" },
  { value: "figshare", label: "FigShare DOI" },
  { value: "hydroshare", label: "Hydroshare resource" },
  { value: "dataverse", label: "Dataverse DOI" },
  { value: "ckan", label: "CKAN dataset" },
] as const;

export const REPOPATHTYPE = [
  { value: "file", label: "File" },
  { value: "url", label: "URL" },
] as const;

export const TemplateOptions = [
  { value: "b2drop", label: "B2Drop" },
  { value: "aws", label: "AWS" },
  { value: "s3compatible", label: "S3 Compliant Storage Provider" },
  { value: "webdav", label: "Webdav" },
] as const;

export const VendorOptions = [
  { value: "nextcloud", label: "Nextcloud" },
  { value: "owncloud", label: "Owncloud" },
  { value: "sharepoint", label: "Sharepoint" },
  { value: "other", label: "Other site/service or software" },
] as const;

const StorageBaseSchema = z.object({
  relativemountpath: z.string(),
  readonly: z.optional(z.boolean()),
  obscure_pass: z.optional(z.string()),
});

const B2DropSchema = StorageBaseSchema.extend({
  template: z.literal("b2drop"),
  user: z.optional(z.string()),
  path: z.optional(z.string()),
});

const AWSSchema = StorageBaseSchema.extend({
  template: z.literal("aws"),
  username: z.optional(z.string()),
  bucketname: z.optional(z.string()),
  region: z.string(),
});

const S3CompatibleProviderSchema = StorageBaseSchema.extend({
  template: z.literal("s3compatible"),
  username: z.optional(z.string()),
  providername: z.string(),
  bucketname: z.optional(z.string()),
  endpoint: z.optional(z.string()),
  region: z.optional(z.string()),
});

const WebdavSchema = StorageBaseSchema.extend({
  template: z.literal("webdav"),
  user: z.optional(z.string()),
  path: z.string(),
  url: z.string(),
  vendor: z.string(),
  bearertoken: z.optional(z.string()),
});

export const StorageSchema = z.discriminatedUnion("template", [
  B2DropSchema,
  AWSSchema,
  S3CompatibleProviderSchema,
  WebdavSchema,
]);

const repo2docker = z.optional(
  z.object({
    repo2dockerdirectlink: z.optional(z.string()),
    repotype: z.optional(z.enum(REPOTYPE.map((r) => r.value))),
    repourl: z.optional(z.string()),
    reporef: z.optional(z.string()),
    repopath: z.optional(z.string()),
    repopathtype: z.optional(z.enum(REPOPATHTYPE.map((r) => r.value))),
    localstoragepath: z.optional(z.string()),
  }),
);

const custom = z.optional(
  z.object({
    customimage: z.optional(z.string()),
    privaterepo: z.optional(z.string()),
    privaterepousername: z.optional(z.string()),
    privaterepopassword: z.optional(z.string()),
    localstoragepath: z.optional(z.string()),
  }),
);

const hpc = z.optional(
  z.object({
    account: z.optional(z.string()),
    partition: z.optional(z.string()),
    project: z.optional(z.string()),
    reservation: z.optional(z.string()),
  }),
);

const resources = z.optional(
  z.object({
    nodes: z.optional(z.string()),
    runtime: z.optional(z.string()),
    gpus: z.optional(z.string()),
    xserver: z.optional(z.string()),
  }),
);

const envVariable = z.object({
  name: z.string(),
  value: z.string(),
});

export const formSchema = z.object({
  name: z.optional(z.string()),
  service: z.optional(z.string()),
  option: z.string(),
  profile: z.string(),
  system: z.string(),
  flavor: z.optional(z.string()),
  modules: z.optional(z.record(z.string(), z.array(z.string()))),
  modules_versions: z.optional(z.record(z.string(), z.array(z.string()))),
  envvariables: z.optional(z.array(envVariable)),
  workshop_id: z.optional(z.boolean()), // Remove optional after testing
  secret_keys: z.array(z.string()).default([]),
  share_id: z.optional(z.string()),
  resources: resources,
  storage: z.optional(
    z.object({
      mounts: z.array(StorageSchema),
      localstoragepath: z.optional(z.string()),
    }),
  ),
  repo2dockerdirectlink: z.optional(z.string()),
  repo2docker: repo2docker,
  custom: custom,
  hpc: hpc,
});

export type FormType = z.infer<typeof formSchema>;

export const defaultFormValues: FormType = {
  name: "",
  service: "",
  option: "",
  profile: "",
  system: "",
  flavor: "",
  modules: {
    kernels: [],
    proxies: [],
    communities: [],
    extensions: [],
  },
  custom: {
    customimage: "",
    privaterepo: "",
    privaterepousername: "",
    privaterepopassword: "",
    localstoragepath: "",
  },
  repo2docker: {
    localstoragepath: "",
    repo2dockerdirectlink: "",
    repopath: "",
    reporef: "",
    repourl: "",
    repotype: undefined,
    repopathtype: undefined,
  },
  hpc: {
    account: "",
    partition: "",
    project: "",
    reservation: "",
  },
  repo2dockerdirectlink: "",
  resources: {
    nodes: "",
    runtime: "",
    gpus: "",
    xserver: "",
  },
  share_id: undefined,
  storage: {
    mounts: [],
    localstoragepath: "",
  },
  workshop_id: false,
  modules_versions: {},
  envvariables: [],
  secret_keys: [],
};
