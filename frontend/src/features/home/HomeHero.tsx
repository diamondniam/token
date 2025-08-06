import { Link } from "react-router";
import { motion } from "framer-motion";
import { Stack, Button, Typography, Box, Container } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import $d from "@/assets/data/pages/home.json";
import { usePreSale } from "@/pages";

export default function HomeHero() {
  const { isClosed: isPreSaleClosed } = usePreSale();

  return (
    <Container component={motion.section} {...$.animations.getFadeUpInView()}>
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
        <Box sx={{ maxWidth: "700px", pb: 5, pt: { sm: 10, xs: 5 }, mb: 5, mx: "auto" }}>
          <Typography
            color="primary.main"
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              background: $.theme.gradients.$primary.main,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: $.theme.fontSize["5xl"], md: $.theme.fontSize["7xl"] },
            }}
            component="div"
          >
            {$d.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {$d.description}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontWeight: $.theme.font.xl }}
          >
            {$d.headline}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to={isPreSaleClosed ? "/stake" : "/pre-sale"}
              disableElevation
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              {$d.buttons.get}
            </Button>

            <Button
              component="a"
              href={"/"}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowDownwardIcon />}
            >
              {$d.buttons.whitepaper}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
