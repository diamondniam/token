import type { WalletDialogIconProps } from "@/features/wallet/types/wallet";
import { Avatar, Badge, Button, Grow, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { green } from "@mui/material/colors";

export default function WalletConnectDialogIcon({
  isActive,
  id,
  icon,
  onClick,
}: WalletDialogIconProps) {
  return (
    <Stack component={Button} color="inherit" onClick={() => onClick(id)}>
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
    </Stack>
  );
}
