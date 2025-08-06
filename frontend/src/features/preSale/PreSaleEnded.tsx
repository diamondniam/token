import { Typography, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import $d from "@/assets/data/pages/preSale.json";

export default function PreSaleEnded() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
      >
        {$d.ended.headline}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
      >
        {$d.ended.description}
      </Typography>

      <Button
        component="a"
        href="/stake"
        variant="contained"
        size="large"
        color="primary"
        sx={{ mx: "auto" }}
        endIcon={<ArrowForwardIcon />}
      >
        {$d.buttons.stake}
      </Button>
    </Box>
  );
}
