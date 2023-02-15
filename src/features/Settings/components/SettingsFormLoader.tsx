import { Skeleton } from "react-native-magnus";

import { Box } from "@core/components";
import theme from "@core/constants/theme";

export const SettingsFormLoader = () => {
  return (
    <Box gap="md">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Box gap="2xs" key={idx}>
          <Skeleton.Box h={15} w="70%" bg={theme.colors.grayLight} />
          <Skeleton.Box h={40} w="100%" bg={theme.colors.grayLight} />
        </Box>
      ))}
    </Box>
  );
};
