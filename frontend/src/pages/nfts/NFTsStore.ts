import { zustandStorages } from "@/utils/helpers/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NFTsStore = {
  isAllCollectedShown: boolean;

  setIsAllCollectedShown: (isAllCollectedShown: boolean) => void;
};

export const useNFTs = create<NFTsStore>()(
  persist(
    (set) => ({
      isAllCollectedShown: false,

      setIsAllCollectedShown: (isAllCollectedShown: boolean) => set({ isAllCollectedShown }),
    }),
    {
      name: "nfts",
      storage: zustandStorages.session,
    },
  ),
);
