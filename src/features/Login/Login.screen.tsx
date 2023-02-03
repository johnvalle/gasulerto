import dayjs from "dayjs";
import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import auth from "@react-native-firebase/auth";

import { Box, Text } from "@core/components";
import Loader from "@core/components/Loader/Loader";
import { useLoading, useUserStore } from "@core/hooks";

import LoginImage from "@assets/images/login-bg.png";

import styles from "./Login.styles";

const Login = () => {
  const { setUser } = useUserStore();
  const { isLoading, setIsLoading } = useLoading();

  const loginAnonymously = async () => {
    try {
      setIsLoading(true);

      const { user } = await auth().signInAnonymously();
      // anonymous user will be logged out 3days from now.
      const threeDaysFromNow = dayjs(user.metadata.creationTime).add(3, "days").valueOf();

      // store auth creds to global store
      setUser({
        name: user.displayName,
        expiresOn: threeDaysFromNow,
        userId: user.uid,
        isAnonymous: user.isAnonymous
      });
    } catch (error) {
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
          <TouchableOpacity onPressIn={() => console.log("google press")} style={styles.googleButton}>
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

export default Login;
