import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useAuth, useUserSettings, useUserStore } from "@core/hooks";

import SettingsPageBanner from "@assets/images/settings-page.png";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingsFormInput, SettingsFormResolver } from "../types/SettingsFormInput";
import { SettingsForm } from "./SettingsForm";
import { SettingsFormLoader } from "./SettingsFormLoader";

export const Settings = React.memo(() => {
  const { isAnonymous } = useUserStore();
  const { setIsLoading } = useContext(LoadingContext);
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
            <Image source={SettingsPageBanner} style={styles.imageBanner} resizeMode="contain" />
            <Text variant="largeMedium" color="black" marginVertical="md" textAlign="center">
              Settings
            </Text>
            {isAnonymous && (
              <Box
                gap="xs"
                py="2xs"
                mb="xs"
                borderTopWidth={StyleSheet.hairlineWidth}
                borderBottomWidth={StyleSheet.hairlineWidth}
                borderColor="grayLight"
                alignItems="center"
                flexDirection="row">
                <Box
                  backgroundColor="warning"
                  p="2xs"
                  borderRadius={theme.spacing["2xl"]}
                  justifyContent="center"
                  alignItems="center">
                  <Icon name="lock" size={theme.spacing.md} color={theme.colors.black} />
                </Box>
                <Box>
                  <Text color="black" variant="extraSmallMedium">
                    Settings locked
                  </Text>
                  <Text color="gray" variant="extraSmallThin">
                    Create an account using Google to update and save settings.
                  </Text>
                </Box>
              </Box>
            )}
            {!userSettings && isSettingsLoading ? (
              <SettingsFormLoader />
            ) : (
              <FormProvider {...methods}>
                <SettingsForm userSettings={userSettings} onSubmit={updateUserSettings} />
              </FormProvider>
            )}
            <Button
              color={theme.colors.primaryDark}
              bg={theme.colors.primaryLight}
              w="100%"
              mt={theme.spacing.xl}
              onPress={signOutUser}
              {...theme.textVariants.smallBold}
              disabled={isSettingsLoading}>
              Logout
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </Wrapper>
  );
});

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
