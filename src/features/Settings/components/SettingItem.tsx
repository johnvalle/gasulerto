import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

type Props = {
  title: string;
  description: string;
};

export default function SettingItem(props: Props) {
  const { title, description } = props;

  return (
    <TouchableOpacity style={{ width: "100%" }}>
      <Box
        paddingVertical="xs"
        flexDirection="row"
        justifyContent="space-between"
        borderTopWidth={StyleSheet.hairlineWidth}
        borderBottomWidth={StyleSheet.hairlineWidth}
        borderColor="grayLight">
        <Box>
          <Text color="black">{title}</Text>
          <Text color="gray">{description}</Text>
        </Box>
        <Icon name="chevron-right" size={theme.spacing.md} color={theme.colors.danger} />
      </Box>
    </TouchableOpacity>
  );
}
