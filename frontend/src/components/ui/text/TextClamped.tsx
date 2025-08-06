import { Typography, type TypographyProps } from "@mui/material";

type ClampedTextProps = {
  lines?: number;
  children: React.ReactNode;
  options: TypographyProps;
};

export default function TextClamped({ lines = 3, children, options }: ClampedTextProps) {
  return (
    <Typography
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        WebkitLineClamp: lines,
      }}
      {...options}
    >
      {children}
    </Typography>
  );
}
