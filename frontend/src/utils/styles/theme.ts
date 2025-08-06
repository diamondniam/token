import { createTheme, type Palette } from "@mui/material";

const palette = {
  $foreground: {
    main: "#e9e9e9ff",
  },
  $neutral: {
    main: "#202020ff",
  },
  $background: {
    main: "#151515ff",
  },
  $border: {
    main: "#2e2e2eff",
  },
} as const;

const gradients = {
  $primary: {
    main: "linear-gradient(27deg,rgba(26, 144, 255, 1) 0%, rgba(20, 46, 133, 1) 80%)",
    secondary: "linear-gradient(27deg,rgba(26, 106, 255, 1) 17%, rgba(20, 133, 103, 1) 95%)",
  },
} as const;

const font = {
  xs: 300,
  sm: 400,
  base: 500,
  md: 500,
  lg: 600,
  xl: 700,
} as const;

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
  "4xl": 38,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
};

const customProps = {
  font,
  fontSize,
  gradients,
} as const;

export type CustomPaletteColor = keyof typeof palette;
export type FontOptions = keyof typeof font;
export type CustomProps = typeof customProps;
export type CustomGradientKey = keyof typeof gradients;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a90ff",
    },
    text: {
      primary: "#e9e9e9ff",
    },
    ...palette,
  } as Palette,
  typography: {
    fontFamily: "Quicksand",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          fontWeight: 600,
          textTransform: "inherit",
        },
        contained: {
          fontWeight: 700,
          textTransform: "inherit",
          borderRadius: 25,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: "#1a211a",
        },
        standardError: {
          backgroundColor: "#2e1a1a",
        },
        standardInfo: {
          backgroundColor: "#1a1a2e",
        },
      },
    },
  },
  ...customProps,
});
