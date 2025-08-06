import { Alert, IconButton, Snackbar, type AlertProps, type SnackbarProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type SnackbarTxStatusType = "success" | "error" | "awaiting";

type SnackbarTxStatusProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  texts?: Record<SnackbarTxStatusType, string>;
  status: SnackbarTxStatusType;
};

type SnackbarTxStatusMapItemOptions = {
  severity: AlertProps["severity"];
  text: string;
  autoHideDuration: SnackbarProps["autoHideDuration"];
};

export default function SnackbarTxStatus({
  isOpen,
  setIsOpen,
  status,
  texts,
}: SnackbarTxStatusProps) {
  const statusMap: Record<SnackbarTxStatusType, SnackbarTxStatusMapItemOptions> = {
    success: {
      severity: "success",
      text: texts?.success || "Transaction successful!",
      autoHideDuration: 10 * 1000,
    },
    error: {
      severity: "error",
      text: texts?.error || "Transaction failed",
      autoHideDuration: undefined,
    },
    awaiting: {
      severity: "info",
      text: texts?.awaiting || "Awaiting confirmation",
      autoHideDuration: undefined,
    },
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={statusMap[status].autoHideDuration}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        severity={statusMap[status].severity}
        sx={{ width: "100%" }}
        action={
          <IconButton color="inherit" size="small" onClick={() => setIsOpen(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {statusMap[status].text}
      </Alert>
    </Snackbar>
  );
}
