import type { DialogProps } from "@/components/ui/dialog/types";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { convertHexToCSSRGBA } from "@/utils/helpers";

export function getSlotProps(isFullScreen: boolean) {
  return {
    backdrop: {
      sx: {
        backgroundColor: convertHexToCSSRGBA($.theme.palette.background.default, 0.5),
        backdropFilter: "blur(2px)",
      },
    },
    paper: {
      sx: {
        borderRadius: isFullScreen ? 0 : 5,
        boxShadow: "none",
        bgcolor: "$neutral.main",
        backgroundImage: "none",
      },
    },
  };
}

export default function Dialog({ id, isOpen, onClose, title, slots, options }: DialogProps) {
  const isFullScreen = useMediaQuery($.theme.breakpoints.down("md"));

  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-conentent`}
      slotProps={getSlotProps(isFullScreen)}
      fullScreen={isFullScreen}
      fullWidth
      maxWidth="xs"
      {...options?.container}
    >
      <DialogTitle id={`${id}-title`} sx={{ p: 3 }} {...options?.title}>
        {slots?.title || (
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h6">{title}</Typography>

            <IconButton onClick={onClose} aria-label="Close" sx={{ bgcolor: "$border.main" }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
      </DialogTitle>

      {slots?.content && (
        <DialogContent id={`${id}-content`} {...options?.content} className="scrollbar-content">
          {slots?.content}
        </DialogContent>
      )}

      {slots?.actions && (
        <DialogActions sx={{ justifyContent: "center" }} {...options?.actions}>
          {slots?.actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
}
