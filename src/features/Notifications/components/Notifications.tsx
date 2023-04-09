import React from "react";
import { Image, RefreshControl, StyleSheet, VirtualizedList } from "react-native";
import { Dimensions } from "react-native";
import { Button } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { useNotifications } from "@core/hooks/useNotifications";

import NotificationPageBanner from "@assets/images/notification-page.png";

import { NotificationCard } from "./NotificationCard";

export const Notifications = React.memo(() => {
  const {
    markAllAsRead,
    initializeNotifications,
    hasNotifications,
    notificationsOrderByTime,
    unreadNotificationsCount,
    isLoading: isLoadingNotifications
  } = useNotifications();

  const hasUnreadNotifications = !!unreadNotificationsCount;
  const onRefresh = () => initializeNotifications();

  return (
    <Wrapper>
      <Image source={NotificationPageBanner} style={styles.bannerImage} resizeMode="contain" />
      <Box
        width="100%"
        alignItems="center"
        flexDirection="row"
        justifyContent={hasNotifications ? "space-between" : "center"}
        my="sm">
        <Box>
          <Text variant="largeMedium" color="black" textAlign={hasNotifications ? "left" : "center"}>
            Notifications
          </Text>
          <Text color="gray" textAlign={hasNotifications ? "left" : "center"}>
            {hasUnreadNotifications ? unreadNotificationsCount : "No"} new notifications
          </Text>
        </Box>
        {hasNotifications && (
          <Button
            bg={hasUnreadNotifications ? theme.colors.success : theme.colors.grayLight}
            onPress={markAllAsRead}
            disabled={!hasUnreadNotifications}
            rounded="circle">
            <Icon
              name="check-all"
              color={hasUnreadNotifications ? theme.colors.white : theme.colors.gray}
              size={theme.spacing.sm}
            />
          </Button>
        )}
      </Box>
      <Box maxHeight={styles.scrollViewContainer.height} width="100%" my="md">
        {hasNotifications && (
          <VirtualizedList
            refreshControl={<RefreshControl refreshing={isLoadingNotifications} onRefresh={onRefresh} />}
            data={notificationsOrderByTime}
            initialNumToRender={10}
            keyExtractor={(item: any) => item.timestamp}
            getItem={(item, idx) => item[idx]}
            getItemCount={() => notificationsOrderByTime.length}
            renderItem={({ item: notification }) => {
              return (
                <NotificationCard
                  key={notification.timestamp}
                  read={notification.read}
                  type={notification.type}
                  message={notification.description}
                  timestamp={notification.timestamp}
                />
              );
            }}
          />
        )}
      </Box>
    </Wrapper>
  );
});

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
