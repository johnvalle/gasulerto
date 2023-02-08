import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Loader, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { useAuth, useLoading } from "@core/hooks";

import SettingsPageBanner from "@assets/images/settings-page.png";

import { SettingsItem } from "./SettingItem";

export const Settings = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { signOut } = useAuth();

  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut();
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
      <TouchableOpacity style={styles.logoutButton} onPress={() => signOutUser()}>
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
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grayLight,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.sm,
    margin: theme.spacing.sm
  },
  imageBanner: {
    width: 300,
    height: 200
  }
});
