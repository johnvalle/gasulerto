import { useContext, useEffect } from "react";
import { Image, Linking, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Button } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useUserSettings } from "@core/hooks";
import { useBuzzerSoundStore } from "@core/hooks/useBuzzerSoundStore";
import { AppScreen, ScreenProps } from "@core/types/navigation";

import GasDetected from "@assets/images/gas-detected.png";

export const Alarm = ({ navigation, route: { params } }: ScreenProps<AppScreen.Alarm>) => {
  const { userSettings, isLoading: isSettingsLoading } = useUserSettings();
  const { setIsLoading } = useContext(LoadingContext);
  const { sound } = useBuzzerSoundStore();

  const callPrimaryContact = () => {
    Vibration.cancel();
    sound?.stop();
    return Linking.openURL(`tel:${userSettings?.primaryContact.number}`);
  };

  const cancelAlarm = () => {
    Vibration.cancel();
    sound?.stop();
    return navigation.navigate(AppScreen.Home);
  };

  useEffect(() => {
    if (sound !== null) {
      sound.play();
      Vibration.vibrate([200, 200, 200], true);
    }
  }, [sound]);

  useEffect(() => {
    setIsLoading(isSettingsLoading);
  }, [isSettingsLoading, setIsLoading]);

  return (
    <Wrapper>
      <Box justifyContent="space-around" flex={1}>
        <Box justifyContent="center" alignItems="center">
          <Text variant="extraLargeBold" color="danger" marginVertical="sm">
            Warning
          </Text>
          <Text variant="largeMedium" color="black" textAlign="center">
            {params?.message ?? "Gas leakage has been detected."}
          </Text>
        </Box>
        <Image source={GasDetected} style={styles.bannerImage} resizeMode="contain" />
        <Box>
          <Box flexDirection="column" alignItems="center" gap="sm">
            <Box>
              <Text variant="mediumRegular" color="black" textAlign="center">
                Are you currently away from home?
              </Text>
              <Text variant="mediumBold" color="black" textAlign="center">
                Call {userSettings?.primaryContact.name}
              </Text>
            </Box>
            <TouchableOpacity style={styles.callButton} onPress={callPrimaryContact}>
              <Icon name="phone" size={theme.spacing.md} color={theme.colors.white} />
            </TouchableOpacity>
          </Box>
          <Text color="gray" textAlign="center" mt="md">
            If this was caused by a false alarm or the leakage has been attended to, please click close
          </Text>
          <Button
            mt="md"
            bg="white"
            alignSelf="center"
            suffix={<Icon name="close" size={theme.spacing.md} color={theme.colors.gray} />}
            onPress={cancelAlarm}>
            <Text color="gray" variant="mediumBold">
              Close
            </Text>
          </Button>
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
    height: 300
  }
});
