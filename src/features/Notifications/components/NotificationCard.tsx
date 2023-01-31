import { StyleSheet } from "react-native";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

import NotificationIcon, { NotificationIconProps } from "./NotificationIcon";

type Props = {
  read: boolean;
} & NotificationIconProps;

export default function NotificationCard(props: Props) {
  const { read } = props;

  const bgColor = read ? "white" : "primaryLight";
  const borderWidth = read ? StyleSheet.hairlineWidth : 0;

  return (
    <Box
      bg={bgColor}
      flexDirection="row"
      gap="xs"
      alignItems="center"
      p="xs"
      borderRadius={theme.spacing.xs}
      width="100%"
      borderColor="grayLight"
      borderWidth={borderWidth}>
      <NotificationIcon type={props.type} />
      <Box>
        <Text color="black">Gas leakage was detected</Text>
        <Box flexDirection="row" gap="2xs">
          <Text variant="extraSmallMedium" color="gray">
            Warning
          </Text>
          <Text variant="extraSmallMedium" color="gray">
            ·
          </Text>
          <Text variant="extraSmallMedium" color="gray">
            3m ago
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
