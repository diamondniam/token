import { Link } from "react-router";
import { motion } from "framer-motion";

import { Typography, Box, Container, Button } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import $d from "@/assets/data/pages/about.json";
import { usePreSale } from "@/pages";

export default function AboutAlreadyConvinced() {
  const { isClosed: isPreSaleClosed } = usePreSale();

  return (
    <Box
      id="eloNft"
      sx={{
        py: 7,
        textAlign: "center",
        bgcolor: "$neutral.main",
        borderTop: 1,
        borderBottom: 1,
        borderColor: "$border.main",
      }}
      component="section"
    >
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Typography
          variant="h6"
          component="div"
          color="primary.main"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {$d.alreadyConvinced.title}
        </Typography>

        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: $.theme.font.xl, mb: 2 }}
        >
          {$d.alreadyConvinced.description}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          {$d.alreadyConvinced.headline}
        </Typography>

        <Button
          component={Link}
          to={isPreSaleClosed ? "/stake" : "/preSale"}
          disableElevation
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          {$d.alreadyConvinced.button}
        </Button>
      </Container>
    </Box>
  );
}
