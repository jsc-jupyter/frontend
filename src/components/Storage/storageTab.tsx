import React, { useContext } from "react";
import {
  useConfigByIndex,
  useAddStorage,
  useUpdateStorage,
  useDeleteStorage,
  JupyterlabIDContext,
} from "../../stores";
import { Label } from "radix-ui";

// TODO : Use actual values
// TODO : Refactor inline styles to CSS or styled-components
const StorageTab = () => {
  const configIndex = useContext(JupyterlabIDContext);
  const config = useConfigByIndex(configIndex);
  const storages = config?.storages;
  const addStorage = useAddStorage();
  const updateStorage = useUpdateStorage();
  const removeStorage = useDeleteStorage();

  const handleAddStorage = () => {
    addStorage(config.id, {
      id: storages.length + 1,
      template: "AWS",
      relativeMountPath: "/mnt/aws-storage",
      path: "/mnt/new-storage",
      readOnly: false,
      username: "your-username",
      password: "your-password",
    });
  };

  const handleUpdateStorageTemplate = (storageId: number, newName: string) => {
    updateStorage(config.id, storageId, { template: newName });
  };

  const handleUpdateRelativeMountPath = (
    storageId: number,
    newPath: string,
  ) => {
    updateStorage(config.id, storageId, { relativeMountPath: newPath });
  };

  const handleUpdateReadOnly = (storageId: number, newBool: boolean) => {
    updateStorage(config.id, storageId, { readOnly: newBool });
  };

  const handleUpdateUsername = (storageId: number, newUsername: string) => {
    updateStorage(config.id, storageId, { username: newUsername });
  };

  const handleUpdatePassword = (storageId: number, newPassword: string) => {
    updateStorage(config.id, storageId, { password: newPassword });
  };

  const handleUpdatePath = (storageId: number, newPath: string) => {
    updateStorage(config.id, storageId, { path: newPath });
  };

  const handleUpdateBucketName = (storageId: number, newBucketName: string) => {
    updateStorage(config.id, storageId, { bucketName: newBucketName });
  };

  const handleUpdateRegion = (storageId: number, newRegion: string) => {
    updateStorage(config.id, storageId, { region: newRegion });
  };

  const handleUpdateProviderName = (
    storageId: number,
    newProviderName: string,
  ) => {
    updateStorage(config.id, storageId, { providerName: newProviderName });
  };

  const handleUpdateEndpoint = (storageId: number, newEndpoint: string) => {
    updateStorage(config.id, storageId, { endpoint: newEndpoint });
  };

  const handleUpdateUrl = (storageId: number, newUrl: string) => {
    updateStorage(config.id, storageId, { url: newUrl });
  };

  const handleUpdateVendor = (storageId: number, newVendor: string) => {
    updateStorage(config.id, storageId, { vendor: newVendor });
  };

  const handleUpdateBearerToken = (
    storageId: number,
    newBearerToken: string,
  ) => {
    updateStorage(config.id, storageId, { bearerToken: newBearerToken });
  };

  const handleDeleteStorage = (storageId: number) => {
    removeStorage(config.id, storageId);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>Add Storage</span>
        <button onClick={() => handleAddStorage()} />
      </div>
      {storages &&
        storages.map((storageItem, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Label.Root>Template</Label.Root>
              <input
                type="text"
                value={storageItem.template}
                onChange={(e) =>
                  handleUpdateStorageTemplate(storageItem.id, e.target.value)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Label.Root>Relative Mount Path</Label.Root>
              <input
                type="text"
                value={storageItem.relativeMountPath}
                onChange={(e) =>
                  handleUpdateRelativeMountPath(storageItem.id, e.target.value)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Label.Root>Read Only</Label.Root>
              <input
                type="checkbox"
                checked={storageItem.readOnly}
                onChange={(e) =>
                  handleUpdateReadOnly(storageItem.id, e.target.checked)
                }
              />
            </div>
            {(storageItem.template === "B2Drop" ||
              storageItem.template === "Webdav") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>Path</Label.Root>
                <input
                  type="text"
                  value={"path" in storageItem ? storageItem.path : ""}
                  onChange={(e) =>
                    handleUpdatePath(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {storageItem.template === "S3CompatibleProvider" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>Provider Name</Label.Root>
                <input
                  type="text"
                  value={
                    "providerName" in storageItem
                      ? storageItem.providerName
                      : ""
                  }
                  onChange={(e) =>
                    handleUpdateProviderName(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {(storageItem.template === "S3CompatibleProvider" ||
              storageItem.template === "AWS") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>Bucket Name</Label.Root>
                <input
                  type="text"
                  value={
                    "bucketName" in storageItem ? storageItem.bucketName : ""
                  }
                  onChange={(e) =>
                    handleUpdateBucketName(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {storageItem.template === "S3CompatibleProvider" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>Endpoint</Label.Root>
                <input
                  type="text"
                  value={"endpoint" in storageItem ? storageItem.endpoint : ""}
                  onChange={(e) =>
                    handleUpdateEndpoint(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {storageItem.template === "Webdav" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>url</Label.Root>
                <input
                  type="text"
                  value={"url" in storageItem ? storageItem.url : ""}
                  onChange={(e) =>
                    handleUpdateUrl(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {storageItem.template === "Webdav" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>vendor</Label.Root>
                <input
                  type="text"
                  value={"vendor" in storageItem ? storageItem.vendor : ""}
                  onChange={(e) =>
                    handleUpdateVendor(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Label.Root>Username</Label.Root>
              <input
                type="text"
                value={storageItem.username}
                onChange={(e) =>
                  handleUpdateUsername(storageItem.id, e.target.value)
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Label.Root>Password</Label.Root>
              <input
                type="text"
                value={storageItem.password}
                onChange={(e) =>
                  handleUpdatePassword(storageItem.id, e.target.value)
                }
              />
            </div>
            {(storageItem.template === "S3CompatibleProvider" ||
              storageItem.template === "AWS") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>Region</Label.Root>
                <input
                  type="text"
                  value={"region" in storageItem ? storageItem.region : ""}
                  onChange={(e) =>
                    handleUpdateRegion(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            {storageItem.template === "Webdav" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Label.Root>bearer Token (optional)</Label.Root>
                <input
                  type="text"
                  value={
                    "bearerToken" in storageItem ? storageItem.bearerToken : ""
                  }
                  onChange={(e) =>
                    handleUpdateBearerToken(storageItem.id, e.target.value)
                  }
                />
              </div>
            )}
            <button onClick={() => handleDeleteStorage(storageItem.id)}>
              Remove Storage
            </button>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default StorageTab;
