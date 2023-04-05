import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

import { SensorData, SensorRange } from "../types/components";

type Props = {
  iconName: string;
  idealRange?: SensorRange;
  range?: SensorRange;
} & SensorData;

export const SensorCardItem = (props: Props) => {
  const { range, idealRange, title, value, iconName } = props;

  const isRangeIdeal = idealRange ? range === idealRange : range !== "high";
  const indicatorIcon = isRangeIdeal ? "check-circle" : "close-circle";
  const indicatorColor = isRangeIdeal ? theme.colors.success : theme.colors.danger;
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
