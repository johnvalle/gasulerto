import { StyleSheet } from "react-native";

import theme from "@core/constants/theme";

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.sm
  },
  imageBackground: { width: "100%", height: "100%" }
});

export default styles;
