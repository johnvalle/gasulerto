import { Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";

import GasDetected from "@assets/images/gas-detected.png";

import styles from "./Alarm.styles";

const Alarm = () => {
  return (
    <Wrapper>
      <Box justifyContent="center" alignItems="center" paddingVertical="md">
        <Text variant="extraLargeBold" color="danger" marginVertical="sm">
          Warning
        </Text>
        <Text variant="largeMedium" color="black" textAlign="center">
          Gas leakage has been detected.
        </Text>

        <Image source={GasDetected} style={{ width: 380, height: 475 }} resizeMode="contain" />
        <Box flexDirection="column" alignItems="center" gap="sm">
          <Box>
            <Text variant="mediumRegular" color="black" textAlign="center">
              Are you currently away from home?
            </Text>
            <Text variant="mediumBold" color="black" textAlign="center">
              Call a primary contact
            </Text>
          </Box>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="phone" size={theme.spacing.md} color={theme.colors.white} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Alarm;
