import { Typography, Box, Container } from "@mui/material";

import $d from "@/assets/data/pages/about.json";

export default function AboutNftPlatform() {
  return (
    <Box
      id="Nft"
      sx={{
        py: 7,
        borderBottom: 1,
        borderColor: "$border.main",
      }}
      component="section"
    >
      <Container>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {$d.nftPlatform.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, maxWidth: "900px" }}>
          ...
        </Typography>
      </Container>
    </Box>
  );
}
