import { Box } from "@mui/material";
import Blockies from "react-blockies";

export default function WalletBlockies({ address }: { address: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Blockies seed={address} size={10} scale={3} />
    </Box>
  );
}
