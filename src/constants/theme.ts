import { createTheme } from "@shopify/restyle";

const palette = {
  primaryDark: "#6579D6",
  primaryLight: "#E0E6FF",
  primary: "#91A0E2",
  danger: "#EF4A6B",
  warning: "#FDC93A",
  success: "#D2E23D",
  info: "#91A0E2",
  white: "#FFFFFF",
  gray: "#949494",
  grayLight: "#DEDEDE",
  black: "#000000"
};

const sizes = { "2xs": 8, xs: 10, sm: 14, md: 18, lg: 24, xl: 32, "2xl": 48 };

export const fontStyles = {
  defaults: {
    fontFamily: "Assistant-Regular",
    fontSize: sizes.sm
  },
  smallThin: {
    fontFamily: "Assistant-Light",
    fontSize: sizes.sm
  },
  smallBold: {
    fontFamily: "Assistant-Bold",
    fontSize: sizes.sm
  },
  mediumBold: {
    fontFamily: "KulimPark-Bold",
    fontSize: sizes.md
  },
  mediumRegular: {
    fontFamily: "Assistant-Regular",
    fontSize: sizes.md
  },
  largeMedium: {
    fontFamily: "KulimPark-SemiBold",
    fontSize: sizes.lg
  },
  extraSmallThin: {
    fontFamily: "Assistant-Light",
    fontSize: sizes.xs
  },
  extraSmallMedium: {
    fontFamily: "Assistant-Medium",
    fontSize: sizes.xs
  },
  extraLargeBold: {
    fontFamily: "KulimPark-Bold",
    fontSize: sizes["2xl"]
  }
};

const theme = createTheme({
  colors: palette,
  spacing: sizes,
  breakpoints: {},
  textVariants: fontStyles
});

export type Theme = typeof theme;
export default theme;
