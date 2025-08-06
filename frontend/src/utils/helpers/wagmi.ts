import {
  EtheriumIcon,
  EtheriumTestnetIcon,
  MetaMaskIcon,
  WalletConnectIcon,
} from "@/components/icons";
import type { Chain, ChainStringId, Connector } from "@/types";
import { getConnectors as getWagmiConnectors, getChains as getWagmiChains } from "@wagmi/core";
import { config } from "@/providers/global/GlobalProvider";
import { localhost, mainnet, sepolia, holesky } from "viem/chains";

export function getFallbackChain() {
  return getChains().find((chain) => chain.id === holesky.id);
}

export function getConnectors() {
  const connectors = getWagmiConnectors(config);
  let handledConnectors: Connector[] = [];

  connectors.forEach((connector) => {
    let tempConnector: Connector = {
      ...connector,
      id: connector.id,
      name: connector.name,
      icon: false,
    };

    switch (connector.id) {
      case "walletConnect":
        tempConnector.icon = WalletConnectIcon();
        break;
      case "injected":
        tempConnector.icon = MetaMaskIcon();
        break;
      default:
        return;
    }

    handledConnectors.push(tempConnector);
  });

  return handledConnectors;
}

export function getChains() {
  const chains = getWagmiChains(config);
  let handledChains: Chain[] = [];

  chains.forEach((chain) => {
    let stringId: ChainStringId, icon;

    switch (chain.id) {
      case mainnet.id:
        stringId = "mainnet";
        icon = EtheriumIcon();
        break;
      case holesky.id:
        stringId = "holesky";
        icon = EtheriumTestnetIcon();
        break;
      case sepolia.id:
        stringId = "sepolia";
        icon = EtheriumTestnetIcon();
        break;
      case localhost.id:
        stringId = "localhost";
        icon = false;
        break;
      default:
        return;
    }

    handledChains.push({
      ...chain,
      stringId,
      icon,
    });
  });

  return handledChains;
}

export function getChainById(id: number) {
  return getChains().find((chain) => chain.id === id);
}
