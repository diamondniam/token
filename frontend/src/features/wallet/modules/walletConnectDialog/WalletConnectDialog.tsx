import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import WalletConnectDialogContent from "@/features/wallet/modules/walletConnectDialog/WalletConnectDialogContent";
import type { WalletDialogProps } from "@/features/wallet/types/wallet";

import { getChains, getConnectors, signIn } from "@/utils/helpers";
import type { Chain, Connector } from "@/types";
import { useAccount } from "wagmi";
import { Dialog } from "@/components/ui";

export default function WalletConnectDialog({ isOpen, onClose }: WalletDialogProps) {
  const [chain, setChain] = useState<Chain>(getChains()[0]);
  const [connector, setConnector] = useState<Connector>(getConnectors()[0]);
  const { isConnected } = useAccount();

  const handleConnectWallet = () => {
    signIn({ chainId: chain.stringId, connectorId: connector.id });

    if (connector.id === "walletConnect") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && isConnected) {
      onClose();
    }
  }, [isConnected]);

  return (
    <Dialog
      id="wallet"
      isOpen={isOpen}
      onClose={onClose}
      title="Connect Wallet"
      slots={{
        content: <WalletConnectDialogContent {...{ chain, setChain, connector, setConnector }} />,
        actions: (
          <Button fullWidth onClick={handleConnectWallet} sx={{ borderRadius: 5 }}>
            Connect
          </Button>
        ),
      }}
    ></Dialog>
  );
}
