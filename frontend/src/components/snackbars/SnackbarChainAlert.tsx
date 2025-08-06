import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { useWallet } from "@/features/wallet";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAllowedChain } from "@/utils/hooks";
import { useErrors } from "@/stores";

export default function SnackbarChainAlert() {
  const { isChainWrong: isOpen, setIsChainWrong: setIsOpen } = useErrors();

  const { chain: wagmiChain, isConnected } = useAccount();
  const { data: chain } = useAllowedChain({ chain: wagmiChain });

  const { setIsConnectDialogOpen } = useWallet();

  useEffect(() => {
    if (isConnected) {
      if (!chain) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [chain]);

  const handleAction = () => {
    setIsConnectDialogOpen(true);
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={(_, reason) => {
        if (reason !== "clickaway") {
          setIsOpen(false);
        }
      }}
    >
      <Alert
        severity="error"
        sx={{ width: "100%", display: "flex" }}
        slotProps={{
          action: {
            sx: { display: "flex", alignItems: "center", pt: 0 },
          },
          icon: {
            sx: { alignSelf: "center" },
          },
        }}
        action={
          <>
            <Divider orientation="vertical" flexItem />

            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              <Box>
                <Button color="inherit" size="small" onClick={handleAction}>
                  {isConnected ? "Switch" : "Connect"}
                </Button>
              </Box>

              <IconButton color="inherit" size="small" onClick={() => setIsOpen(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </>
        }
      >
        {isConnected ? "Please switch to the available network" : "Please connect your wallet"}
      </Alert>
    </Snackbar>
  );
}
