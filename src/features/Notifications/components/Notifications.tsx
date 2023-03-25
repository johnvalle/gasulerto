import { Image, ScrollView, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";

import NotificationPageBanner from "@assets/images/notification-page.png";

import { NotificationCard } from "./NotificationCard";

export const Notifications = () => {
  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={styles.bannerImage} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Notifications
      </Text>
      <Box maxHeight={styles.scrollViewContainer.height} width="100%">
        <ScrollView>
          <Box flexDirection="column" gap="2xs">
            <NotificationCard read={false} type="info" message="Your system is now updated." />
            <NotificationCard read={true} type="warning" message="Temperature threshold is almost exceeded." />
            <NotificationCard read={true} type="danger" message="Gas leak detected." />
          </Box>
        </ScrollView>
      </Box>
    </Wrapper>
  );
};

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
