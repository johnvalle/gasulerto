import { Image } from "react-native";

import { Box, Text, Wrapper } from "@core/components";

import NotificationPageBanner from "@assets/images/notification-page.png";

import NotificationCard from "./components/NotificationCard";

function Notifications() {
  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={{ width: 300, height: 200 }} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Notifications
      </Text>
      <Box flexDirection="column" gap="2xs" width="100%">
        <NotificationCard read={false} type="info" />
        <NotificationCard read={true} type="warning" />
        <NotificationCard read={true} type="danger" />
      </Box>
    </Wrapper>
  );
}

export default Notifications;
