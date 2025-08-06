import { Link } from "react-router";
import { motion } from "framer-motion";

import { Container, Grid } from "@mui/material";

import CertikLogo from "@/assets/images/logos/partners/certik.svg?react";
import BinancechainLogo from "@/assets/images/logos/partners/binancechain.svg?react";
import CoinmarketcapLogo from "@/assets/images/logos/partners/coinmarketcap.svg?react";

export default function Partners() {
  const iconProps = {
    style: {
      height: "60px",
      width: "200px",
      color: $.theme.palette.$foreground.main,
    },
  };

  const partners = [
    {
      label: "binancechain",
      component: <BinancechainLogo {...iconProps} />,
    },
    {
      label: "coinmarketcap",
      component: <CoinmarketcapLogo {...iconProps} />,
    },
    {
      label: "certik",
      component: <CertikLogo {...iconProps} />,
    },
  ];

  return (
    <Container sx={{ pb: 5, mb: 5 }} component={motion.div} {...$.animations.getFadeInView()}>
      <Grid
        container
        rowSpacing={{ xs: 2, md: 5 }}
        columnSpacing={5}
        alignItems="center"
        justifyContent="center"
        size={{ xs: 6, sm: 4, md: 2 }}
      >
        {partners.map((partner, i) => (
          <Grid key={i} sx={{ textAlign: "center" }}>
            <Link to="/" target="_blank" rel="noreferrer" style={{ filter: "grayscale(100%)" }}>
              {partner.component}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
