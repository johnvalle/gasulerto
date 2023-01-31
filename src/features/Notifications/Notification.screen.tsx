import { Image, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { StatusBar } from "react-native";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";

import NotificationPageBanner from "@assets/images/notification-page.png";

import NotificationCard from "./components/NotificationCard";

function Notifications() {
  const paddedDeviceHeight = Dimensions.get("window").height - theme.spacing.lg - (StatusBar.currentHeight ?? 0);
  const imgHeight = 200 + theme.spacing.md;
  const scrollViewHeight = paddedDeviceHeight - imgHeight;
  const h = scrollViewHeight;
  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={{ width: 300, height: 200 }} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Notifications
      </Text>
      <Box maxHeight={h}>
        <ScrollView style={{ backgroundColor: "green", flexGrow: 0 }}>
          <Box flexDirection="column" gap="2xs">
            <NotificationCard read={false} type="info" />
            <NotificationCard read={true} type="warning" />
            <NotificationCard read={true} type="danger" />
          </Box>
        </ScrollView>
      </Box>
    </Wrapper>
  );
}

export default Notifications;
