import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

import $d from "@/assets/data/pages/preSale.json";

export default function PreSaleSteps() {
  return (
    <Box sx={{ maxWidth: "650px", margin: "auto", mb: 4 }}>
      <Stepper activeStep={-1} alternativeLabel>
        {$d.steps.items.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
