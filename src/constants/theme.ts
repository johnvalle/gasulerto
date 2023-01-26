import { createTheme } from "@shopify/restyle";

const palette = {
  primaryDark: "#2F355B",
  primaryLight: "#9FA2B5",
  primary: "#6177FF",
  danger: "#DA2D38",
  warning: "#FFAD4E",
  success: "#84E68D",
  white: "#FFFFFF",
  gray: "#EEEEEE"
};

enum Colors {
  PRIMARY_DARK = "primaryDark",
  PRIMARY_LIGHT = "primaryLight",
  PRIMARY = "primary",
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
  WHITE = "white",
  GRAY = "gray"
}

enum Sizes {
  XS = 10,
  S = 16,
  M = 24,
  L = 32,
  XL = 40,
  XXL = 56
}

const theme = createTheme({
  colors: palette,
  spacing: Sizes,
  breakpoints: {},
  textVariants: {
    defaults: {
      fontFamily: "Inter-Regular",
      fontSize: Sizes.S,
      color: Colors.PRIMARY_DARK
    },
    smallBold: {
      fontFamily: "Inter-Bold",
      fontSize: Sizes.S
    },
    mediumBold: {
      fontFamily: "Inter-Bold",
      fontSize: Sizes.M
    },
    extraSmallThin: {
      fontFamily: "Inter-Thin",
      fontSize: Sizes.XS
    },
    extraSmallMedium: {
      fontFamily: "Inter-Medium",
      fontSize: Sizes.XS
    }
  }
});

export type Theme = typeof theme;
export default theme;
