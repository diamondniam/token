import { motion } from "framer-motion";

import { Grid, Typography, Box, Container, Stack } from "@mui/material";
import CubesIcon from "@/assets/images/icons/cubes.svg?react";

import $d from "@/assets/data/pages/home.json";

export default function HomeFeatures() {
  return (
    <Box
      sx={{
        bgcolor: "$neutral.main",
        py: 7,
        borderTop: 1,
        borderBottom: 1,
        borderColor: "$border.main",
      }}
      component={"section"}
    >
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Box sx={{ maxWidth: "500px" }}>
          <Typography
            variant="body1"
            color="primary.main"
            sx={{ mb: 1, fontWeight: $.theme.font.xl }}
          >
            {$d.features.title}
          </Typography>

          <Typography
            color="text.primary"
            variant="h4"
            sx={{ fontWeight: $.theme.font.xl, mb: 5 }}
            component="div"
          >
            {$d.features.description}
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {$d.features.items.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 6 }}>
              <Stack direction="row" spacing={2}>
                <CubesIcon style={{ width: "36px", height: "36px", flexShrink: 0 }} />

                <Box>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.primary"
                    sx={{ fontWeight: $.theme.font.xl, fontSize: "0.875rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
