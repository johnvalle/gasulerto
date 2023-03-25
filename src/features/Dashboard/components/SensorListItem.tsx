import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

type Props = {
  isHigh: boolean;
  value: string;
  title: string;
};

export const SensorListItem = (props: Props) => {
  const { isHigh, value, title } = props;

  const arrowType = isHigh ? "arrow-up" : "arrow-down";
  const arrowColor = isHigh ? theme.colors.danger : theme.colors.success;

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderColor="grayLight"
      paddingVertical="xs">
      <Box flexDirection="row" alignItems="center" gap="sm">
        <Icon name={arrowType} size={theme.spacing.md} color={arrowColor} />
        <Text variant="smallBold" color="gray">
          {title}
        </Text>
      </Box>
      <Text color="gray">{value}</Text>
    </Box>
  );
};
