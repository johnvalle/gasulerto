import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

import Box from "./Box";

type Props = { style?: ViewStyle } & PropsWithChildren;

export default function Wrapper(props: Props) {
  const { children, style } = props;
  return (
    <Box flex={1} alignItems="center" padding="md" backgroundColor="white" width="100%" height="100%" style={style}>
      {children}
    </Box>
  );
}
