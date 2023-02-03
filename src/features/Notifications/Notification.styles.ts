import { Dimensions, StyleSheet } from "react-native";

import theme from "@constants/theme";

const paddedDeviceHeight = Dimensions.get("window").height - theme.spacing.lg;
const bannerText = theme.spacing.lg + theme.spacing.md; // space occupied by banner text
const bottomTab = theme.spacing.xl + theme.spacing.md; // space occupied by bottom tab
const imageHeight = 200;
const contentHeight = imageHeight + bannerText + bottomTab + theme.spacing.sm; //adding padding;
const remainingSpace = paddedDeviceHeight - contentHeight;
const scrollViewHeight = (remainingSpace / paddedDeviceHeight) * 100;
const scrollHeight = `${scrollViewHeight}%`;

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: scrollHeight
  },
  bannerImage: {
    height: imageHeight,
    width: "100%"
  }
});

export default styles;
