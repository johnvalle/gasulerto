import { Image, Modal, StatusBar } from "react-native";

import theme from "@core/constants/theme";

import Loading from "@assets/images/juicy-teamwork.gif";

import { Box, Text, Wrapper } from "../Shopify";
import styles from "./Loader.styles";

type Props = {
  message?: string;
  isVisible?: boolean;
};

const defaultMessage = "Please wait while we get things ready for you.";

export const Loader = (props: Props) => {
  const { message = defaultMessage, isVisible = true } = props;
  return (
    <Modal visible={isVisible} transparent={true}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.white} />
      <Wrapper>
        <Box width="100%" flex={1} marginTop="2xl" alignItems="center">
          <Box width={300} height={300} justifyContent="center" alignItems="center" borderRadius={theme.spacing.md}>
            <Box flex={1} width="100%" height={200} borderRadius={200}>
              <Image source={Loading} style={styles.imageLoader} resizeMode="contain" />
            </Box>
          </Box>
          <Box paddingVertical="sm" gap="sm">
            <Text variant="largeMedium" textAlign="center" color="primary">
              Almost there!
            </Text>
            <Text color="gray" textAlign="center">
              {message}
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </Modal>
  );
};
