import { useAccount } from "wagmi";

import { Box, Typography } from "@mui/material";
import PreSaleSteps from "@/features/preSale/PreSaleSteps";
import PreSaleOpenedCard from "@/features/preSale/modules/PreSaleOpenedCard";

import $d from "@/assets/data/pages/preSale.json";

export default function PreSaleOpened() {
  const { isConnected } = useAccount();

  return (
    <Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2, textAlign: "center", maxWidth: 600, mx: "auto" }}
      >
        {$d.steps.headline}
      </Typography>

      {!isConnected && <PreSaleSteps />}

      <PreSaleOpenedCard />
    </Box>
  );
}
