import { StyleSheet } from "react-native";

import theme, { sizes } from "@core/constants/theme";

export default StyleSheet.create({
  googleButton: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: sizes.xs,
    padding: sizes.sm
  }
});
