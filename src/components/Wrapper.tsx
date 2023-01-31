import { PropsWithChildren } from "react";

import Box from "./Box";

type Props = {} & PropsWithChildren;

export default function Wrapper(props: Props) {
  const { children } = props;
  return (
    <Box flex={1} alignItems="center" padding="md" backgroundColor="white" width="100%" height="100%">
      {children}
    </Box>
  );
}
