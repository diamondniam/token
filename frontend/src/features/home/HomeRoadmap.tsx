import { motion } from "framer-motion";

import { Typography, Box, Container } from "@mui/material";

import HomeRoadmapMap from "@/features/home/modules/homeRoadmap/HomeRoadmapMap";
import HomeRoadmapMapMobile from "@/features/home/modules/homeRoadmap/HomeRoadmapMapMobile";

import $d from "@/assets/data/pages/home.json";

export default function HomeRoadmap() {
  return (
    <Box sx={{ py: 7 }} component="section">
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          {$d.roadMap.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, textAlign: "center" }}>
          {$d.roadMap.description}
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <HomeRoadmapMap />
        </Box>

        <Box
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <HomeRoadmapMapMobile />
        </Box>
      </Container>
    </Box>
  );
}
