import { Image, ScrollView } from "react-native";
import { Dimensions } from "react-native";

import { Box, Text, Wrapper } from "@core/components";

import NotificationPageBanner from "@assets/images/notification-page.png";

import styles from "./Notification.styles";
import NotificationCard from "./components/NotificationCard";

const Notifications = () => {
  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={styles.bannerImage} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Notifications
      </Text>
      <Box maxHeight={styles.scrollViewContainer.height} width="100%">
        <ScrollView>
          <Box flexDirection="column" gap="2xs">
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
