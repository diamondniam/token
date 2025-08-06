import type { WalletDialogIconProps } from "@/features/wallet/types/wallet";
import { Avatar, Badge, Button, Grow, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { green } from "@mui/material/colors";

export default function WalletConnectDialogIcon({
  isActive,
  id,
  name,
  icon,
  onClick,
}: WalletDialogIconProps) {
  return (
    <Stack component={Button} color="inherit" spacing={1} onClick={() => onClick(id)}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          isActive && (
            <Grow in>
              <Avatar sx={{ bgcolor: green[500], width: 30, height: 30 }}>
                <DoneIcon sx={{ fontSize: 15 }} color="inherit" />
              </Avatar>
            </Grow>
          )
        }
      >
        <Avatar sx={{ width: 60, height: 60 }}>{icon}</Avatar>
      </Badge>

      <Typography variant="body2">{name}</Typography>
    </Stack>
  );
}
