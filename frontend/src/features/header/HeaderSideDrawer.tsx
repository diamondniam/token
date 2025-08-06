import { Link, useLocation } from "react-router";
import { Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import type { HeaderSideDrawerProps } from "@/features/header/types/header";
import { useHeader } from "@/features/header/HeaderProvider";

const HEADER_HEIGHT = 65;

export default function HeaderSideDrawer({ isOpen, onClose }: HeaderSideDrawerProps) {
  const router = useLocation();
  const { sideDrawerButtons } = useHeader();

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
            top: HEADER_HEIGHT,
            backgroundColor: "$background.main",
            backgroundImage: "none",
          },
        },
        backdrop: {
          sx: { backgroundColor: "transparent" },
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List component="nav">
          {sideDrawerButtons.map((link) => (
            <ListItemButton
              component={Link}
              to={link.href}
              key={link.href}
              selected={router.pathname === link.href}
              onClick={onClose}
            >
              <ListItemText primary={link.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
