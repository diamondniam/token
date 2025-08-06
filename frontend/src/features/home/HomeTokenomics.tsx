import { useRef } from "react";
import { motion } from "framer-motion";

import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import { BorderLinearProgress } from "@/features/home/styled";

import { useInView } from "@/utils/hooks";

import $d from "@/assets/data/pages/home.json";
import { AnimationNumberCounter } from "@/components";

export default function HomeTokenomics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.5 });

  return (
    <Box
      ref={sectionRef}
      id="tokenomics"
      sx={{
        bgcolor: "$neutral.main",
        py: 7,
        borderBottom: 1,
        borderTop: 1,
        borderColor: "$border.main",
      }}
      component="section"
    >
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          {$d.tokenomics.title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 800, mx: "auto", textAlign: "center" }}
        >
          {$d.tokenomics.description}
        </Typography>

        <Typography
          variant="h3"
          component="div"
          color="text.primary"
          sx={{
            fontWeight: $.theme.font.xl,
            textAlign: "center",
            background: $.theme.gradients.$primary.secondary,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: $.theme.fontSize["3xl"], md: $.theme.fontSize["5xl"] },
          }}
        >
          1B - 1,000,000,000
        </Typography>

        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
          sx={{ mb: 5, textAlign: "center" }}
        >
          {$d.tokenomics.totalSupply.label}
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            p: 2,
            boxShadow: "0 2px 16px rgb(53 69 89 / 5%)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              color="text.primary"
              sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
            >
              {$d.tokenomics.statistics.title}
            </Typography>

            {$d.tokenomics.statistics.data.map((item, i) => (
              <Grid container key={i} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="h6" component="span" color="text.secondary">
                    {item.label}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: "10%", display: "flex", alignItems: "center" }}>
                      <AnimationNumberCounter
                        duration={"auto"}
                        to={item.value}
                        isActive={isInView}
                        style={{ fontSize: $.theme.fontSize.md, fontWeight: $.theme.font.lg }}
                      />
                      %
                    </Box>

                    <Box sx={{ width: "90%" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={isInView ? item.value : 0}
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
