import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

import $d from "@/assets/data/pages/stake.json";

export default function StakeSteps() {
  return (
    <Box sx={{ maxWidth: "650px", margin: "auto", mb: 4 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
        {$d.steps.title}
      </Typography>

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
