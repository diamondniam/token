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

function HomeRoadmapMapContent({ text }: { text: string }) {
  return (
    <TimelineContent sx={{ m: "auto 0" }}>
      <Typography variant="h6" component="span" color="text.secondary" sx={{ mb: 0 }}>
        {text}
      </Typography>
    </TimelineContent>
  );
}

export default function HomeRoadmapMapItems({
  items,
  side,
}: {
  items: { text: string; done: boolean }[];
  side: "left" | "right";
}) {
  return (
    <Timeline>
      {items.map((item, i) => (
        <motion.div
          key={i}
          {...$.animations.getFadeUpInView({ viewport: { once: true, amount: 1 } })}
        >
          <TimelineItem>
            <TimelineOppositeContent sx={{ display: "none" }} />

            {side === "right" && <HomeRoadmapMapContent text={item.text} />}

            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "$border.main" }} />

              <TimelineDot
                variant={item.done ? "filled" : "outlined"}
                sx={{ boxShadow: "none" }}
              ></TimelineDot>

              <TimelineConnector sx={{ bgcolor: "$border.main" }} />
            </TimelineSeparator>

            {side === "left" && <HomeRoadmapMapContent text={item.text} />}
          </TimelineItem>
        </motion.div>
      ))}
    </Timeline>
  );
}
