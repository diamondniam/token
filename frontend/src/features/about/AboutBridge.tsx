import { motion } from "framer-motion";

import { Typography, Box, Container, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import $d from "@/assets/data/pages/about.json";

export default function AboutBridge() {
  return (
    <Box
      id="bridge"
      sx={{
        bgcolor: "neutral.main",
        py: 7,
        borderBottom: 1,
        borderColor: "$border.main",
      }}
      component="section"
    >
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          {$d.bridge.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: "900px" }}>
          ...
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: "900px" }}>
          ...
        </Typography>

        <Button
          component="a"
          href="https://bridge.poly.network/token/"
          target="_blank"
          rel="noopener noreferrer"
          disableElevation
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          {$d.bridge.button}
        </Button>
      </Container>
    </Box>
  );
}
