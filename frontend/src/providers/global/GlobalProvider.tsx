import { createContext, useContext } from "react";
import { http, createConfig, WagmiProvider, injected } from "wagmi";
// @ts-ignore
import { mainnet, sepolia, holesky, localhost } from "wagmi/chains";
import { walletConnect } from "@wagmi/connectors";

import type { ContextType, ProviderProps } from "@/providers/global/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppDataProvider from "@/providers/appData";

const Context = createContext<ContextType | null>(null);

export const config = createConfig({
  chains: [
    // localhost,
    // mainnet,
    // sepolia,
    holesky,
  ],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    }),
  ],
  transports: {
    // [localhost.id]: http(),
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
    [holesky.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function GlobalProvider({ children }: ProviderProps) {
  return (
    <Context.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <AppDataProvider>{children}</AppDataProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </Context.Provider>
  );
}

export function useGlobal() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }

  return context;
}
