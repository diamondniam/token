import { useState } from "react";
import { NavLink } from "react-router";

import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useHeader } from "@/features/header/HeaderProvider";
import { button } from "@/utils/styles";

export default function HeaderNavbarMenu() {
  const { navbarMoreMenu } = useHeader();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="header-navbar-more-button"
        size="large"
        onClick={handleClick}
        aria-controls={isOpen ? "more-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          fontWeight: $.theme.font.base,
          ...button.variants.text.default,
          color: "$foreground.main",
        }}
      >
        More
      </Button>

      <Menu
        id="header-navbar-more-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              boxShadow: "0 4px 14px 0 rgb(0 0 0 / 10%)",
              borderRadius: "15px",
            },
          },
          list: {
            "aria-labelledby": "header-navbar-more-button",
          },
        }}
      >
        {navbarMoreMenu.links.map((link) => (
          <MenuItem key={link.href} onClick={handleClose} component={NavLink} to={link.href}>
            {link.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
