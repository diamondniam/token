import type { AppDataStoreNFTDataItem } from "@/types";
import { create } from "zustand";

type DialogUserMintedNFT = {
  isOpen: boolean;
  data: AppDataStoreNFTDataItem | undefined;
  type: "allMinted" | "default";

  setIsOpen: (isOpen: boolean) => void;
  setData: (data: AppDataStoreNFTDataItem | undefined) => void;
  setType: (type: "allMinted" | "default") => void;
};

export const useDialogUserMintedNFT = create<DialogUserMintedNFT>((set) => ({
  isOpen: false,
  data: undefined,
  type: "default",

  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setData: (data: AppDataStoreNFTDataItem | undefined) => set({ data }),
  setType: (type: "allMinted" | "default") => set({ type }),
}));
