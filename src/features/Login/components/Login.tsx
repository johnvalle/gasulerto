import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Box, Loader, Text } from "@core/components";
import theme from "@core/constants/theme";
import { useAuth, useLoading } from "@core/hooks";

import LoginImage from "@assets/images/login-bg.png";
import { WEB_CLIENT_ID } from "@env";

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID
});

export const Login = () => {
  const { signInAnonymously, signInUsingGoogle } = useAuth();
  const { isLoading, setIsLoading } = useLoading();

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInUsingGoogle();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to login using Google");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAnonymously = async () => {
    try {
      setIsLoading(true);
      await signInAnonymously();
    } catch (error) {
      console.error(error);
      throw Error("Failed to signin anonymously");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={LoginImage} style={styles.imageBackground} resizeMode="cover">
      {isLoading ? <Loader /> : null}
      <Box
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        paddingTop="xl"
        paddingHorizontal="md"
        paddingBottom="2xl">
        <Text variant="extraLargeBold" color="primaryDark" textAlign="center">
          Gasulerto
        </Text>
        <Box gap="md">
          <TouchableOpacity onPressIn={() => loginWithGoogle()} style={styles.googleButton}>
            <Text variant="smallBold" color="white" textAlign="center">
              Sign in using Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loginAnonymously()}>
            <Text color="gray" textAlign="center">
              Continue as a guest
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.sm
  },
  imageBackground: { width: "100%", height: "100%" }
});
