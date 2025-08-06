import { convertHexToCSSRGBA } from "@/utils/helpers";
import { theme } from "@/utils/styles/theme";

const primaryMainOpacity10 = convertHexToCSSRGBA(theme.palette.primary.main, 0.1);
const foregroundMainOpacity10 = convertHexToCSSRGBA(theme.palette.$foreground.main, 0.1);

export const button = {
  variants: {
    text: {
      default: {
        px: 2,
        borderRadius: 5,
        color: "$foreground.main",
      },
      primary: {
        px: 2,
        borderRadius: 5,
        color: "primary.main",
        bgcolor: primaryMainOpacity10,
        ":hover": {
          bgcolor: primaryMainOpacity10,
          color: "primary.main",
        },
      },
    },
    third: {
      color: "text.secondary",
      ":hover": {
        bgcolor: foregroundMainOpacity10,
        color: "text.secondary",
      },
    },
  },
};
