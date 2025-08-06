import MetaMaskSvg from "@/assets/images/logos/meta-mask.svg?react";
import { Box } from "@mui/material";

export default function MetaMaskIcon() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#661800",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MetaMaskSvg style={{ width: 40, height: 40 }} />
    </Box>
  );
}
