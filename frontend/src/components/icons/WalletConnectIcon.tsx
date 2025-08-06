import { Box } from "@mui/material";
import WalletConnectSvg from "@/assets/images/logos/wallet-connect.svg?react";

export default function WalletConnectIcon() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "$background.main",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WalletConnectSvg style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
