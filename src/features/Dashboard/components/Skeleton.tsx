import { StyleSheet } from "react-native";
import { Skeleton } from "react-native-magnus";

import { Box } from "@core/components";
import theme from "@core/constants/theme";

export const Chart = () => <Skeleton.Box mt="sm" h={200} bg={theme.colors.grayLight} />;

export const ListItem = () => (
  <Box
    flex={1}
    flexDirection="row"
    alignItems="center"
    py="sm"
    borderColor="grayLight"
    borderTopWidth={StyleSheet.hairlineWidth}
    borderBottomWidth={StyleSheet.hairlineWidth}>
    <Box gap="sm" flex={1} flexDirection="row" alignItems="center">
      <Skeleton.Circle bg={theme.colors.grayLight} w={theme.spacing.md} h={theme.spacing.md} />
      <Skeleton.Box bg={theme.colors.grayLight} w={80} />
    </Box>
    <Skeleton.Box bg={theme.colors.grayLight} w={40} />
  </Box>
);

export const CardItem = () => (
  <Box
    flex={1}
    borderWidth={StyleSheet.hairlineWidth}
    borderColor="grayLight"
    borderRadius={theme.spacing.sm}
    p="sm"
    flexDirection="column"
    width={160}
    height={100}
    justifyContent="space-between">
    <Box flex={1} alignItems="flex-end">
      <Skeleton.Circle bg={theme.colors.grayLight} w={theme.spacing.md} h={theme.spacing.md} />
    </Box>
    <Skeleton.Box bg={theme.colors.grayLight} w={40} mb={theme.spacing.sm} />
    <Skeleton.Box bg={theme.colors.grayLight} w={80} />
  </Box>
);
