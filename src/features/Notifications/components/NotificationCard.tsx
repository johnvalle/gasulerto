import dayjs from "dayjs";
import { StyleSheet } from "react-native";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

import { NotificationIcon, NotificationIconProps } from "./NotificationIcon";

type Props = {
  read: boolean;
  message: string;
  timestamp: number;
} & NotificationIconProps;

export const NotificationCard = (props: Props) => {
  const { read, type, message, timestamp } = props;

  return (
    <Box
      bg={!read ? "grayLight" : "white"}
      flexDirection="row"
      gap="xs"
      alignItems="center"
      p="xs"
      mb="2xs"
      borderRadius={theme.spacing.xs}
      width="100%"
      position="relative"
      borderColor="grayLight"
      borderWidth={StyleSheet.hairlineWidth}>
      <NotificationIcon type={props.type} />
      <Box flex={1}>
        <Text color="black">{message}</Text>
        <Box flexDirection="row" gap="2xs">
          <Text variant="extraSmallMedium" color="gray" textTransform="capitalize">
            {type}
          </Text>
          <Text variant="extraSmallMedium" color="gray">
            ·
          </Text>
          <Text variant="extraSmallMedium" color="gray">
            {dayjs().to(dayjs(timestamp))}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
