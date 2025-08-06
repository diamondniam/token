import { motion } from "framer-motion";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

import { Typography } from "@mui/material";
import HomeRoadmapMapItems from "@/features/home/modules/homeRoadmap/HomeRoadmapMapItems";

import $d from "@/assets/data/pages/home.json";

export default function HomeRoadmapMap() {
  return (
    <Timeline position="alternate">
      {$d.roadMap.steps.map((phase, i) => (
        <TimelineItem key={i}>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <Typography
              variant="h5"
              component={motion.span}
              color="text.primary"
              sx={{ mb: 0, fontWeight: $.theme.font.lg }}
              {...$.animations.getFadeInView()}
            >
              {phase.title}
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "$border.main" }} />

            <TimelineDot
              sx={{ boxShadow: "none" }}
              variant={phase.data.every((item) => item.done) ? "filled" : "outlined"}
            ></TimelineDot>
            <TimelineConnector sx={{ bgcolor: "$border.main" }} />
          </TimelineSeparator>

          <TimelineContent sx={{ py: "15px" }}>
            <HomeRoadmapMapItems items={phase.data} side={i % 2 === 0 ? "left" : "right"} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
