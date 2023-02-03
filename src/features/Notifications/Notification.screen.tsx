import { Image, ScrollView } from "react-native";
import { Dimensions } from "react-native";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";

import NotificationPageBanner from "@assets/images/notification-page.png";

import NotificationCard from "./components/NotificationCard";

const Notifications = () => {
  const paddedDeviceHeight = Dimensions.get("window").height - theme.spacing.lg;
  const imgHeight = 200;
  const scrollViewHeight = paddedDeviceHeight - imgHeight;
  const h = scrollViewHeight;
  const d = (h / paddedDeviceHeight) * 100;

  console.log({ h, d: d });
  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={{ width: 300, height: 200 }} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Notifications
      </Text>
      <Box>
        <ScrollView style={{ width: "100%" }}>
          <Box flexDirection="column" gap="2xs" width="100%">
            <NotificationCard read={false} type="info" />
            <NotificationCard read={true} type="warning" />
            <NotificationCard read={true} type="danger" />
          </Box>
        </ScrollView>
      </Box>
    </Wrapper>
  );
};

export default Notifications;
