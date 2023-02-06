import dayjs from "dayjs";
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import auth from "@react-native-firebase/auth";

import { Box, Loader, Text } from "@core/components";
import theme from "@core/constants/theme";
import { useLoading, useUserStore } from "@core/hooks";

import LoginImage from "@assets/images/login-bg.png";

GoogleSignin.configure({
  webClientId: "1019732544899-nipup4d5kbs8kaa1luri0du0k3k8ps0f.apps.googleusercontent.com"
});

export const Login = () => {
  const { setUser } = useUserStore();
  const { isLoading, setIsLoading } = useLoading();

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      const twoWeeksFromNow = dayjs(user.metadata.creationTime).add(2, "weeks").valueOf();
      const token = await user.getIdToken();

      setUser({
        name: user.displayName,
        expiresOn: twoWeeksFromNow,
        userId: user.uid,
        token: token,
        isAnonymous: user.isAnonymous
      });
    } catch (error) {
      console.error(error);
      console.error("Failed to login using Google");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAnonymously = async () => {
    try {
      setIsLoading(true);

      const { user } = await auth().signInAnonymously();
      // anonymous user will be logged out 3days from now.
      const threeDaysFromNow = dayjs(user.metadata.creationTime).add(3, "days").valueOf();
      const token = await user.getIdToken();

      // store auth creds to global store
      setUser({
        name: user.displayName,
        expiresOn: threeDaysFromNow,
        userId: user.uid,
        token: token,
        isAnonymous: user.isAnonymous
      });
    } catch (error) {
      console.error(error);
      console.error("Failed to login anonymously");
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
