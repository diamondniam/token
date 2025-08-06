import { motion } from "framer-motion";

import { Box, Typography } from "@mui/material";
import HomeRoadmapMapItems from "@/features/home/modules/homeRoadmap/HomeRoadmapMapItems";

import $d from "@/assets/data/pages/home.json";

export default function HomeRoadmapMobile() {
  return $d.roadMap.steps.map((phase, i) => (
    <Box key={i}>
      <Typography
        variant="h5"
        component={motion.span}
        color="text.primary"
        sx={{ fontWeight: $.theme.font.lg }}
        {...$.animations.getFadeInView()}
      >
        {phase.title}
      </Typography>

      <HomeRoadmapMapItems items={phase.data} side={"left"} />
    </Box>
  ));
}
