import { create } from "zustand";

type WalletStore = {
  isConnectDialogOpen: boolean;
  isDetailsDialogOpen: boolean;
  setIsConnectDialogOpen: (isOpen: boolean) => void;
  setIsDetailsDialogOpen: (isOpen: boolean) => void;
};

export const useWallet = create<WalletStore>((set) => ({
  isConnectDialogOpen: false,
  isDetailsDialogOpen: false,
  setIsConnectDialogOpen: (isOpen: boolean) => set({ isConnectDialogOpen: isOpen }),
  setIsDetailsDialogOpen: (isOpen: boolean) => set({ isDetailsDialogOpen: isOpen }),
}));
