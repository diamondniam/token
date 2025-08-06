import { NavLink, useLocation } from "react-router";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { Button } from "@mui/material";
import { useHeader } from "@/features/header/HeaderProvider";
import { Typography } from "@mui/material";
import { button } from "@/utils/styles";
// import HeaderNavbarMenu from "@/features/header/HeaderNavbarMenu";

export default function HeaderNavbar() {
  const { pathname } = useLocation();
  const { navbarButtons } = useHeader();

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        component="nav"
        sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        {navbarButtons.map((link) => (
          <Button
            key={link.id}
            component={NavLink}
            to={link.href}
            disabled={link.isUpcoming || link.isClosed ? true : false}
            color="primary"
            size="large"
            sx={{
              fontWeight: $.theme.font.base,
              ...button.variants.text.default,
              ...(pathname === link.href && button.variants.text.primary),
            }}
          >
            <Badge
              badgeContent={
                <Typography variant="caption">{link.isUpcoming ? "SOON" : "CLOSED"}</Typography>
              }
              invisible={link.isUpcoming || link.isClosed ? false : true}
              color="primary"
            >
              <Typography
                variant="body1"
                color="$foreground.main"
                sx={{ fontWeight: $.theme.font.base }}
              >
                {link.name}
              </Typography>
            </Badge>
          </Button>
        ))}

        {/* <HeaderNavbarMenu /> */}
      </Stack>
    </>
  );
}
