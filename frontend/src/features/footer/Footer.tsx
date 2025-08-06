import { Typography, Stack, Grid, IconButton, Container, Divider } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import TwitterLogo from "@mui/icons-material/Twitter";
import TelegramLogo from "@mui/icons-material/Telegram";
import DiscordLogo from "@/assets/images/logos/discord.svg?react";

import CertikLogo from "@/assets/images/logos/partners/certik.svg?react";

import $d from "@/assets/data/features/footer.json";

const iconsMap = {
  twitter: <TwitterLogo />,
  telegram: <TelegramLogo />,
  discord: <DiscordLogo />,
  certik: <CertikLogo style={{ height: "60px", width: "200px" }} />,
  email: <EmailIcon />,
};

const Footer = () => {
  return (
    <>
      <Divider sx={{ borderColor: "$border.main" }} />

      <Container component="footer" sx={{ pt: 4 }}>
        <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
          {$d.auditionTitle}
        </Typography>

        <Stack direction="row" spacing={2} mt={2} alignItems="center" justifyContent="center">
          {$d.partners.map((partner, i) => (
            <a
              key={i}
              href={"/"}
              target="_blank"
              rel="noreferrer"
              style={{ filter: "grayscale(100%)", color: $.theme.palette.text.primary }}
            >
              {iconsMap[partner.icon as keyof typeof iconsMap]}
            </a>
          ))}
        </Stack>

        <Grid container spacing={2} alignItems="center" justifyContent="center" my={2}>
          {$d.socialLinks.map((link) => (
            <Grid size={{ xs: 2, md: 1 }} sx={{ textAlign: "center" }} key={link.label}>
              <IconButton
                component="a"
                href={link.href}
                target="_blank"
                aria-label={link.label}
                sx={{ color: "text.primary" }}
              >
                {iconsMap[link.icon as keyof typeof iconsMap]}
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mt: 3, pb: 3, textAlign: "center" }}
        >
          {$d.copyright.start} {new Date().getFullYear()} {$d.copyright.end}
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
