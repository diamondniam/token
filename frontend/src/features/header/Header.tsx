import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

import { AppBar, Box, Toolbar, IconButton, Container, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderNavbar from "@/features/header/HeaderNavbar";
import { Wallet } from "@/features";
import Logo from "@/assets/images/logos/diamondniam-sign.png";
import HeaderSideDrawer from "@/features/header/HeaderSideDrawer";
import Provider from "@/features/header/HeaderProvider";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery($.theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <Provider>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "$background.main",
            backdropFilter: "blur(20px)",
            borderBottom: 1,
            borderColor: "$border.main",
          }}
        >
          <Container>
            <Toolbar sx={{ justifyContent: "space-between", px: "0px !important" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {mobileDrawerOpen ? (
                        <motion.div key="close" {...$.animations.getFade()}>
                          <CloseIcon />
                        </motion.div>
                      ) : (
                        <motion.div key="open" {...$.animations.getFade()}>
                          <MenuIcon />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </IconButton>
                )}

                <Box>
                  <Link to="/">
                    <img
                      src={Logo}
                      alt="DNM logo"
                      width="60"
                      style={{ filter: "invert(100%)", scale: 1.3 }}
                    />
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <HeaderNavbar />
              </Box>

              <Box>
                <Wallet />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {isMobile && (
          <HeaderSideDrawer onClose={() => setMobileDrawerOpen(false)} isOpen={mobileDrawerOpen} />
        )}
      </Provider>
    </>
  );
};

export default Header;
