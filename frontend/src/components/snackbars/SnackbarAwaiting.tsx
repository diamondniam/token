import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarAwaitingProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text?: string;
};

export default function SnackbarAwaiting({ isOpen, setIsOpen, text }: SnackbarAwaitingProps) {
  return (
    <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
      <Alert
        severity="info"
        sx={{ width: "100%" }}
        action={
          <IconButton color="inherit" size="small" onClick={() => setIsOpen(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {text || "Awaiting"}
      </Alert>
    </Snackbar>
  );
}
