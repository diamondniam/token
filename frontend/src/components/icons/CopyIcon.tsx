import { forwardRef, useState } from "react";

import { Grow, IconButton, Tooltip, type TooltipProps } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { TransitionProps } from "@mui/material/transitions";

type Props = {
  title: string;
  string: string;
  options?: {
    container?: Omit<TooltipProps, "children" | "title">;
  };
};

export default function CopyIcon({ title, string, options }: Props) {
  const [actualTitle, setActualTitle] = useState(title);

  const copyToClipboard = (string: string) => {
    navigator.clipboard.writeText(string);
  };

  const handleClick = () => {
    copyToClipboard(string);
    setActualTitle("Copied!");
  };

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Grow ref={ref} {...props} onExited={() => setActualTitle(title)} />;
  });

  return (
    <Tooltip
      title={actualTitle}
      slots={{
        transition: Transition,
      }}
      {...options?.container}
    >
      <IconButton size="medium" onClick={handleClick}>
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
