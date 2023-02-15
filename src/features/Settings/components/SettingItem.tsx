import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

import { Box, Text } from "@core/components";

type Props = {
  title: string;
  description: string;
  onPress: () => void;
} & PropsWithChildren;

export const SettingsItem = (props: Props) => {
  const { title, description, children } = props;

  return (
    <Box
      width="100%"
      borderTopWidth={StyleSheet.hairlineWidth}
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderColor="grayLight"
      paddingVertical="xs">
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Text color="primary" variant="smallBold">
            {title}
          </Text>
          <Text color="gray">{description}</Text>
        </Box>
      </Box>
      {children}
    </Box>
  );
};
