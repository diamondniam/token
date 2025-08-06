import type { Chain as ViemChain } from "viem";
import type { Connector as WagmiConnector } from "wagmi";

export type ChainStringId = "mainnet" | "sepolia" | "holesky" | "localhost";

export interface Connector extends Omit<WagmiConnector, "icon" | "connect" | "id"> {
  id: string;
  name: string;
  icon: React.ReactNode;
  getProvider: () => Promise<any>;
  connect: ({ chainId }: { chainId: number }) => void;
}

export interface Chain extends ViemChain {
  stringId: ChainStringId;
  icon: React.ReactNode | false;
}
