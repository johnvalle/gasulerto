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

  const isInvalid = Number.isNaN(value) || !range;

  return (
    <Box
      flex={1}
      position="relative"
      borderWidth={StyleSheet.hairlineWidth}
      borderColor="grayLight"
      borderRadius={theme.spacing.xs}
      padding="xs"
      justifyContent="flex-end"
      width={160}
      height={100}>
      <Box
        width={theme.spacing.md}
        height={theme.spacing.md}
        borderRadius={24}
        position="absolute"
        top={theme.spacing.xs}
        right={theme.spacing.xs}>
        <Icon
          name={isInvalid ? "minus-circle" : indicatorIcon}
          size={theme.spacing.md}
          color={isInvalid ? theme.colors.gray : indicatorColor}
        />
      </Box>
      <Icon name={iconName} size={theme.spacing.md} color={theme.colors.primary} />
      <Box>
        <Text variant="smallBold" color="gray">
          {title}
        </Text>
        <Text color="gray" variant="smallThin">
          {value}
        </Text>
      </Box>
    </Box>
  );
};
