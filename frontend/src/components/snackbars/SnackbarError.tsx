import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarErrorProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text?: string;
};

export default function SnackbarError({ isOpen, setIsOpen, text }: SnackbarErrorProps) {
  return (
    <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
      <Alert
        severity="error"
        sx={{ width: "100%" }}
        action={
          <IconButton color="inherit" size="small" onClick={() => setIsOpen(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {text || "Something went wrong"}
      </Alert>
    </Snackbar>
  );
}
