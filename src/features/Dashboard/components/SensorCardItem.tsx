import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

import { SensorData } from "../types/components";

type Props = {
  iconName: string;
} & SensorData;

const SensorCardItem = (props: Props) => {
  const { isHigh, title, value, iconName } = props;

  const indicatorIcon = isHigh ? "close-circle" : "check-circle";
  const indicatorColor = isHigh ? theme.colors.danger : theme.colors.success;
  return (
    <Box
      gap="2xs"
      position="relative"
      borderWidth={StyleSheet.hairlineWidth}
      borderColor="grayLight"
      borderRadius={theme.spacing.sm}
      padding="xs"
      justifyContent="flex-end"
      width={150}
      height={130}>
      <Box
        width={theme.spacing.md}
        height={theme.spacing.md}
        borderRadius={24}
        position="absolute"
        top={theme.spacing.xs}
        right={theme.spacing.xs}>
        <Icon name={indicatorIcon} size={theme.spacing.md} color={indicatorColor} />
      </Box>
      <Icon name={iconName} size={theme.spacing.md} color={theme.colors.primary} />
      <Text variant="mediumBold" color="primary">
        {title}
      </Text>
      <Text color="gray">{value}</Text>
    </Box>
  );
};

export default SensorCardItem;
