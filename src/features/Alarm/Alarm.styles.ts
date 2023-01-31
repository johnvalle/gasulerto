import { StyleSheet } from "react-native";

import theme from "@core/constants/theme";

export default StyleSheet.create({
  callButton: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.xs
  }
});
