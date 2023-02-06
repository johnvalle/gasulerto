import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";

import GasDetected from "@assets/images/gas-detected.png";

export const Alarm = () => {
  return (
    <Wrapper>
      <Box justifyContent="center" alignItems="center" paddingVertical="md">
        <Text variant="extraLargeBold" color="danger" marginVertical="sm">
          Warning
        </Text>
        <Text variant="largeMedium" color="black" textAlign="center">
          Gas leakage has been detected.
        </Text>

        <Image source={GasDetected} style={styles.bannerImage} resizeMode="contain" />
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

const styles = StyleSheet.create({
  callButton: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.xs
  },
  bannerImage: {
    width: 380,
    height: 475
  }
});
