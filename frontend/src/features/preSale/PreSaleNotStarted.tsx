import moment from "moment";
import Countdown from "react-countdown";

import { usePreSale } from "@/pages/preSale";
import { Box, Typography } from "@mui/material";

import $d from "@/assets/data/pages/preSale.json";

export default function PreSaleNotStarted() {
  const { opensIn } = usePreSale();

  if (opensIn) {
    return (
      <Box
        sx={{
          my: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: $.theme.font.xl }}>
          {$d.notStarted.headline}
        </Typography>

        <Typography variant="h2" sx={{ fontFamily: "Roboto Mono", mb: 1 }} color="text.primary">
          <Countdown date={opensIn} />
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {moment(opensIn).format("Do of MMMM, h:mm:ss A")}
        </Typography>
      </Box>
    );
  }
}
