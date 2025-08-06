import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { sectionsTitles } from "@/utils/helpers";
import { getRandomInt } from "@/utils/helpers";
import { useRef, useState } from "react";
import type { AppDataSkeletonSectionOptions } from "@/types";

export default function StakeCardSkeleton() {
  const [sections, setSections] = useState<AppDataSkeletonSectionOptions[]>([]);
  const isMobile = useMediaQuery($.theme.breakpoints.down("sm"));

  const isInitialized = useRef(false);

  const setup = () => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    setSections(getSections());
  };

  const getSections = () => {
    let sections = [];

    for (let i = 0; i < Object.keys(sectionsTitles).length; i++) {
      sections.push({
        id: i,
        titleWidth: getRandomInt(100, 200),
        data: Array.from({ length: 4 }).map((_, index) => ({
          id: index,
          titleWidth: getRandomInt(100, 200),
          valueWidth: getRandomInt(100, 200),
        })),
      });
    }

    return sections;
  };

  setup();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 10,
        p: 1,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {sections.map((section) => (
          <Box key={section.id}>
            <Divider textAlign="left">
              <Skeleton width={section.titleWidth} height={20} animation="wave" />
            </Divider>

            {section.data.map((item) => (
              <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "start" : "center"}
                mt={2}
                key={item.id}
              >
                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                  variant="body1"
                  display="block"
                >
                  <Skeleton width={item.titleWidth} height={20} animation="wave" />
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                  variant="body1"
                  display="block"
                >
                  <Skeleton width={item.valueWidth} height={20} animation="wave" />
                </Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
