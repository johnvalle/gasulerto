import { Image, StyleSheet, TouchableOpacity } from "react-native";

import auth from "@react-native-firebase/auth";

import { Loader, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { useLoading, useUserStore } from "@core/hooks";

import SettingsPageBanner from "@assets/images/settings-page.png";

import { SettingsItem } from "./SettingItem";

export const Settings = () => {
  const { logOut } = useUserStore();
  const { isLoading, setIsLoading } = useLoading();

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      logOut();
    } catch (err) {
      console.error(err, "Failed to signout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      {isLoading ? <Loader /> : null}
      <Image source={SettingsPageBanner} style={styles.imageBanner} resizeMode="contain" />
      <Text variant="mediumBold" color="black" marginVertical="md">
        Settings
      </Text>
      <SettingsItem title="Gas leak threshold" description="Alarm when threshold is exceeded" />
      <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
        <Text variant="smallBold" color="gray" textAlign="center">
          Logout
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    width: "100%",
    backgroundColor: theme.colors.grayLight,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.sm,
    margin: theme.spacing.sm
  },
  imageBanner: {
    width: 300,
    height: 200
  }
});
