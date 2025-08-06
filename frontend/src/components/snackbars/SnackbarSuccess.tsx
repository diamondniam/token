import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarSuccessProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text?: string;
};

export default function SnackbarSuccess({ isOpen, setIsOpen, text }: SnackbarSuccessProps) {
  return (
    <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        action={
          <IconButton color="inherit" size="small" onClick={() => setIsOpen(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {text || "Success"}
      </Alert>
    </Snackbar>
  );
}
