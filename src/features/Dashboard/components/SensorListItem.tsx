import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

type Props = {
  value: string;
  title: string;
  iconName: string;
  iconColor: string;
};

export const SensorListItem = (props: Props) => {
  const { value, title, iconName, iconColor } = props;

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
        <Icon name={iconName} size={theme.spacing.md} color={iconColor} />
        <Text variant="smallBold" color="gray">
          {title}
        </Text>
      </Box>
      <Text color="gray">{value}</Text>
    </Box>
  );
};
