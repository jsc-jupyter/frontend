import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createKubeSlice } from "./slices/kubeSlice";
import { createUnicoreSlice } from "./slices/unicoreSlice";
import { createSharedSlice } from "./slices/sharedSlice";
import type { CombinedStore } from "./slices/types";

export type { CombinedStore } from "./slices/types";
export type {
  Unicore,
  EntitlementInfo,
  KubeSlice,
  UnicoreSlice,
  SharedSlice,
} from "./slices/types";

export const useCombinedStore = create<CombinedStore>()(
  devtools(
    (...a) => ({
      ...createKubeSlice(...a),
      ...createUnicoreSlice(...a),
      ...createSharedSlice(...a),
    }),
    { name: "CombinedStore" },
  ),
);
