import type { Chain, Connector } from "@/types";

export type WalletDialogContextType = {};

export type WalletDialogProviderProps = {
  children: React.ReactNode;
};

export type WalletDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type WalletDialogIconProps = {
  isActive: boolean;
  id: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
};

export type WalletDialogConetentProps = {
  chain: Chain;
  setChain: (chain: Chain) => void;
  connector: Connector;
  setConnector: (connector: Connector) => void;
};

export type WalletDetailsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};
