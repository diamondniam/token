import { motion } from "framer-motion";

import { Grid, Typography, Box, Container, Avatar, Badge } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import DiamondNowSrc from "@/assets/images/icons/team/diamond-now.jpg";
import DiamondRedSrc from "@/assets/images/icons/team/diamond-red.jpg";
import DiamondPiratSrc from "@/assets/images/icons/team/diamond-pirat.jpg";
import DymkaSrc from "@/assets/images/icons/team/dymka.jpg";
import DiamondBoredSrc from "@/assets/images/icons/team/diamond-bored.jpg";

import $d from "@/assets/data/pages/about.json";

const srcMap = {
  "diamond-now": DiamondNowSrc,
  "diamond-red": DiamondRedSrc,
  "diamond-pirat": DiamondPiratSrc,
  dymka: DymkaSrc,
  "diamond-bored": DiamondBoredSrc,
};

export default function AboutTeam() {
  return (
    <Box sx={{ py: 7, borderTop: 1, borderColor: "$border.main" }} component="section">
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Box sx={{ maxWidth: "500px" }}>
          <Typography variant="h5" color="primary.main" sx={{ mb: 1, fontWeight: $.theme.font.xl }}>
            {$d.team.title}
          </Typography>

          <Typography
            color="text.primary"
            variant="h4"
            sx={{ fontWeight: $.theme.font.xl, mb: 5 }}
            component="div"
          >
            {$d.team.description}
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {$d.team.members.map((member, i) => (
            <Grid
              key={i}
              size={{ xs: 12, md: 4 }}
              component={motion.div}
              {...$.animations.getFadeUpInView({ viewport: { once: true, amount: 1 } })}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    component="a"
                    href={member.linkedin}
                    target="_blank"
                    sx={{
                      bgcolor: "#fff",
                      width: 30,
                      height: 30,
                      border: "2px solid #fff",
                    }}
                  >
                    <LinkedInIcon />
                  </Avatar>
                }
              >
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  src={srcMap[member.avatar as keyof typeof srcMap]}
                />
              </Badge>

              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: $.theme.font.xl, fontSize: "0.875rem" }}
                >
                  {member.name}
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ fontSize: "0.875rem", mb: 1, fontWeight: 500 }}
                >
                  {member.title}
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ fontSize: "0.875rem" }}
                >
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
