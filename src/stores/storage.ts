interface StorageBase {
  id: number;
  template: string;
  relativeMountPath: string;
  readOnly: boolean;
  username: string;
  password: string;
}

interface B2Drop extends StorageBase {
  path: string;
}

interface AWS extends StorageBase {
  bucketName: string; // AWS/S3 Only
  region: string; // AWS/S3 Only
}

interface S3CompatibleProvider extends StorageBase {
  providerName: string; // unique
  bucketName: string; // AWS/S3 Only
  endpoint: string; // unique
  region: string; // AWS/S3 Only
}

interface Webdav extends StorageBase {
  path: string;
  url: string;
  vendor: string;
  bearerToken: string;
}

export type Storage = B2Drop | AWS | S3CompatibleProvider | Webdav;
