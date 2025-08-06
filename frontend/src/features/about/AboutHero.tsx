import { motion } from "framer-motion";

import { Typography, Box, Container } from "@mui/material";

import $d from "@/assets/data/pages/about.json";

export default function AboutHero() {
  return (
    <Container component={motion.div} {...$.animations.getFadeUpInView()}>
      <Box sx={{ maxWidth: "800px", py: 5, my: 5, mx: "auto" }}>
        <Typography
          variant="h5"
          color="primary.main"
          sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
        >
          {$d.title}
        </Typography>

        <Typography
          color="text.primary"
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          component="div"
        >
          {$d.description}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, textAlign: "center" }}>
          {$d.headline}
        </Typography>
      </Box>
    </Container>
  );
}
