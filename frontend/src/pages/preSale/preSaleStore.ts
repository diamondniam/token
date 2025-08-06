import { zustandStorages } from "@/utils/helpers/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreSaleStore = {
  isOpened: boolean;
  isClosed: boolean;
  opensIn: number | null;
  closesIn: number | null;

  setOpensIn: (opensIn: number) => void;
  setClosesIn: (closesIn: number) => void;
  setIsOpened: (isOpened: boolean) => void;
  setIsClosed: (isClosed: boolean) => void;
};

export const usePreSale = create<PreSaleStore>()(
  persist(
    (set) => ({
      isOpened: false,
      opensIn: null,
      closesIn: null,
      isClosed: false,

      setOpensIn: (opensIn: number) => set({ opensIn }),
      setClosesIn: (closesIn: number) => set({ closesIn }),
      setIsOpened: (isOpened: boolean) => set({ isOpened }),
      setIsClosed: (isClosed: boolean) => set({ isClosed }),
    }),
    {
      name: "preSale",
      storage: zustandStorages.session,
    },
  ),
);
