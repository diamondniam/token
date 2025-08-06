import { getRandomInt } from "@/utils/helpers";
import { Box, Card, CardActions, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { useRef } from "react";

export default function NFTsListSkeleton() {
  const isInitialized = useRef(false);
  const mockArray = useRef<{ id: number; description: { id: number; width: number }[] }[]>([]);

  const getMockArray = () => {
    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      description: Array.from({ length: getRandomInt(1, 2) }).map((_, i) => ({
        id: i,
        width: getRandomInt(60, 100),
      })),
    }));
  };

  if (!isInitialized.current) {
    mockArray.current = getMockArray();
    isInitialized.current = true;
  }

  return (
    <Grid container spacing={2}>
      {mockArray.current.map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 4, md: 3 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Skeleton variant="rounded" height={295} animation="wave" />

              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: $.theme.font.lg }}>
                  <Skeleton animation="wave" />
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {mockArray.current[i].description.map((item, i) => (
                    <Skeleton key={i} width={`${item.width}%`} animation="wave" />
                  ))}
                </Typography>
              </Box>
            </CardContent>

            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="rounded" width={60} height={30} animation="wave" />
              <Skeleton variant="rounded" width={60} height={30} animation="wave" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
