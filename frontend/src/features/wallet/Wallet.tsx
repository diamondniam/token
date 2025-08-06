import { Button } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { useAccount } from "wagmi";
import WalletDetailsDialog from "@/features/wallet/modules/walletDetailsDialog";
import WalletConnectDialog from "@/features/wallet/modules/walletConnectDialog";
import { elipseText } from "@/utils/helpers/text";
import WalletBlockies from "@/features/wallet/WalletBlockies";
import { useWallet } from "@/features/wallet/walletStore";

export default function Wallet() {
  const {
    isConnectDialogOpen,
    isDetailsDialogOpen,
    setIsConnectDialogOpen,
    setIsDetailsDialogOpen,
  } = useWallet();
  const { address, isConnected } = useAccount();

  const handleDetailsDialogOpen = () => {
    setIsDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setIsDetailsDialogOpen(false);
  };

  const handleConnectDialogOpen = () => {
    setIsConnectDialogOpen(true);
  };

  const handleConnectDialogClose = () => {
    setIsConnectDialogOpen(false);
  };

  return (
    <>
      {!isConnected ? (
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={handleConnectDialogOpen}
          startIcon={<WalletIcon />}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          variant="text"
          disableElevation
          fullWidth
          onClick={handleDetailsDialogOpen}
          startIcon={<WalletBlockies address={String(address)} />}
          sx={{ borderRadius: 5, px: 2, color: $.theme.palette.$foreground.main }}
        >
          {elipseText(String(address), 4)}
        </Button>
      )}

      <WalletConnectDialog isOpen={isConnectDialogOpen} onClose={handleConnectDialogClose} />
      <WalletDetailsDialog isOpen={isDetailsDialogOpen} onClose={handleDetailsDialogClose} />
    </>
  );
}
