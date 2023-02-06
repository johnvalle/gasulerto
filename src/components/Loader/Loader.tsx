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
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.black} />
      <Wrapper style={styles.wrapper}>
        <Box width="100%" flex={1} justifyContent="center" alignItems="center">
          <Box
            width={200}
            height={200}
            bg="white"
            justifyContent="center"
            alignItems="center"
            borderRadius={theme.spacing.md}>
            <Box flex={1} width="100%" height={200} borderRadius={200}>
              <Image source={Loading} style={styles.imageLoader} resizeMode="contain" />
            </Box>
          </Box>
          <Box paddingVertical="lg" gap="sm">
            <Text variant="largeMedium" textAlign="center" color="success">
              Almost there!
            </Text>
            <Text variant="smallBold" color="white" textAlign="center">
              {message}
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </Modal>
  );
};
