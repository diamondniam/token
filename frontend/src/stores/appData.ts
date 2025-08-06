import type {
  AppDataSection,
  AppDataStore,
  AppDataStoreNFTData,
  DtoType,
  StoreQueryKeys,
} from "@/types";
import { serializeBigInt, zustandStorages } from "@/utils/helpers/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppData = create<AppDataStore>()(
  persist(
    (set, get) => ({
      tokenInfo: {
        data: [],
        handled: [],
      },
      addressInfo: {
        data: [],
        handled: [],
      },
      nftInfo: {
        data: undefined,
        handled: {
          balance: 0,
          items: [],
        },
      },

      setTokenInfo: (key: StoreQueryKeys, data: DtoType[] | AppDataSection[]) =>
        set({ tokenInfo: { ...get().tokenInfo, [key]: data } }),
      setAddressInfo: (key: StoreQueryKeys, data: DtoType[] | AppDataSection[]) =>
        set({ addressInfo: { ...get().addressInfo, [key]: data } }),
      setNftInfo: (key: StoreQueryKeys, data: DtoType | AppDataStoreNFTData) =>
        set({ nftInfo: { ...get().nftInfo, [key]: data } }),
    }),
    {
      name: "appData",
      storage: serializeBigInt(zustandStorages.session),
    },
  ),
);
