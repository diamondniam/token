import { Link } from "react-router";
import { motion } from "framer-motion";

import { Typography, Box, Container, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HighlightIcon from "@mui/icons-material/Highlight";

export default function AboutFunFact() {
  return (
    <Box
      id="funFact"
      sx={{
        py: 7,
        textAlign: "center",
      }}
      component="section"
    >
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <HighlightIcon />

        <Typography
          variant="h6"
          component="div"
          color="primary.main"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Fun Fact
        </Typography>

        <Typography
          variant="h3"
          component="div"
          sx={{ mb: 2, maxWidth: "800px", mx: "auto", fontWeight: 500 }}
        >
          ...
        </Typography>

        <Button component={Link} to="/mint" endIcon={<ArrowForwardIcon />}>
          Mint an NFT Now
        </Button>
      </Container>
    </Box>
  );
}
