import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-magnus";

import { Box, Loader, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { useAuth, useLoading, useUserSettings } from "@core/hooks";

import SettingsPageBanner from "@assets/images/settings-page.png";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingsFormInput, SettingsFormResolver } from "../types/SettingsFormInput";
import { SettingsForm } from "./SettingsForm";
import { SettingsFormLoader } from "./SettingsFormLoader";

export const Settings = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { signOut } = useAuth();
  const { updateUserSettings, userSettings, isLoading: isSettingsLoading } = useUserSettings();

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

  const methods = useForm<SettingsFormInput>({
    resolver: zodResolver(SettingsFormResolver)
  });

  React.useEffect(() => {
    if (!!userSettings && !!methods) {
      methods.reset({
        threshold: userSettings.threshold,
        primaryContact: userSettings.primaryContact
      });
    }
  }, [userSettings, methods]);

  return (
    <Wrapper>
      <ScrollView>
        <KeyboardAvoidingView>
          <Box>
            {isLoading && <Loader />}
            <Image source={SettingsPageBanner} style={styles.imageBanner} resizeMode="contain" />
            <Text variant="mediumBold" color="black" marginVertical="md" textAlign="center">
              Settings
            </Text>
            {!userSettings && isSettingsLoading ? (
              <SettingsFormLoader />
            ) : (
              <FormProvider {...methods}>
                <SettingsForm userSettings={userSettings} onSubmit={updateUserSettings} />
              </FormProvider>
            )}
            <Button
              bg={theme.colors.gray}
              w="100%"
              mt={theme.spacing.xl}
              onPress={() => signOutUser()}
              {...theme.textVariants.smallBold}
              disabled={isSettingsLoading}>
              Logout
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
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
    marginVertical: theme.spacing.sm
  },
  imageBanner: {
    width: 300,
    height: 200
  }
});
