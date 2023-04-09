import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Text, Wrapper } from "@core/components";
import theme from "@core/constants/theme";
import { useUserSettings, useUserStore } from "@core/hooks";

import SettingsPageBanner from "@assets/images/settings-page.png";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingsFormInput, SettingsFormResolver } from "../types/SettingsFormInput";
import { SettingsForm } from "./SettingsForm";
import { SettingsFormLoader } from "./SettingsFormLoader";

export const Settings = React.memo(() => {
  const { isAnonymous } = useUserStore();
  const { updateUserSettings, userSettings, isLoading: isSettingsLoading } = useUserSettings();

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
      <ScrollView style={{ width: "100%" }}>
        <KeyboardAvoidingView>
          <Box gap="sm" flex={1} width="100%">
            <Image source={SettingsPageBanner} style={styles.imageBanner} resizeMode="contain" />
            <Box flex={1} flexDirection="row" justifyContent="space-between" my="sm">
              <Box>
                <Text variant="largeMedium" color="black">
                  Settings
                </Text>
                {isAnonymous && <Text color="gray">Create account using Google to edit settings.</Text>}
                {methods.formState.isDirty && <Text color="gray">You have unsaved changes.</Text>}
              </Box>
              {methods.formState.isDirty && (
                <Box flex={1} flexDirection="row" gap="xs" alignSelf="center" justifyContent="flex-end">
                  <Button
                    loading={methods.formState.isSubmitting}
                    rounded="md"
                    onPress={methods.handleSubmit(updateUserSettings)}
                    bg={theme.colors.success}>
                    Save
                  </Button>
                  <Button
                    onPress={() => methods.reset()}
                    bg={theme.colors.gray}
                    rounded="circle"
                    disabled={methods.formState.isSubmitting}>
                    <Icon name="undo" color={theme.colors.white} size={theme.spacing.sm} />
                  </Button>
                </Box>
              )}
            </Box>
            {!userSettings && isSettingsLoading ? (
              <SettingsFormLoader />
            ) : (
              <FormProvider {...methods}>
                <SettingsForm userSettings={userSettings} />
              </FormProvider>
            )}
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
    width: "100%",
    height: 200
  }
});
