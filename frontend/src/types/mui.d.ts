import type { CustomPaletteColor, CustomProps, CustomGradientKey } from "@/utils/styles";
import type {
  Theme,
  Palette,
  PaletteOptions,
  PaletteColor,
  PaletteColorOptions,
  Breakpoints,
  BreakpointOverrides,
} from "@mui/material";

interface CustomColor {
  success?: string;
  opacity?: {
    low: string;
    medium: string;
    high: string;
  };
}

type CustomPalette = {
  [K in CustomPaletteColor]: Palette["primary"] & CustomColor;
};

type CustomBreakpoints = {
  "2xs": number;
};

type CustomGradient = {
  [K in CustomGradientKey]: Palette["primary"] & CustomColor;
};

declare module "@mui/material" {
  interface Theme extends CustomProps {}
  interface ThemeOptions extends CustomProps {}

  interface PaletteColor extends CustomColor {}
  interface PaletteColorOptions extends CustomColor {}

  interface Palette extends CustomPalette, CustomGradient {}
  interface PaletteOptions extends CustomPalette, CustomGradient {}

  interface BreakpointOverrides extends CustomBreakpoints {}
}
