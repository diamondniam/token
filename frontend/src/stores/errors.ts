import { create } from "zustand";

type ErrorsStore = {
  isSomethingWrong: string | boolean;
  isChainWrong: boolean;

  setIsSomethingWrong: (isSomethingWrong: string | boolean) => void;
  setIsChainWrong: (isChainWrong: boolean) => void;
};

export const useErrors = create<ErrorsStore>((set) => ({
  isSomethingWrong: false,
  isChainWrong: false,

  setIsChainWrong: (isChainWrong: boolean) => set({ isChainWrong }),
  setIsSomethingWrong: (isSomethingWrong: string | boolean) => set({ isSomethingWrong }),
}));
