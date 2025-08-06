import type { DialogContentProps, DialogProps as MuiDialogProps } from "@mui/material";

export type DialogProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  slots?: {
    title?: React.ReactNode;
    content?: React.ReactNode;
    actions?: React.ReactNode;
  };
  options?: {
    container?: Omit<MuiDialogProps, "open">;
    title?: Record<string, unknown>;
    content?: DialogContentProps;
    actions?: Record<string, unknown>;
  };
};
