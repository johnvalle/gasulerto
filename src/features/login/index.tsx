import { ImageBackground, TouchableOpacity, View } from "react-native";

import { Box, Text } from "@core/components";

import LoginImage from "@assets/images/login-bg.png";

import styles from "./styles";

export function Login() {
  return (
    <ImageBackground source={LoginImage} style={{ width: "100%", height: "100%" }} resizeMode="cover">
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingVertical: 48,
          paddingHorizontal: 16,
          paddingBottom: 56
        }}>
        <Text variant="mediumBold" color="primaryDark" textAlign="center">
          Gasulerto
        </Text>
        <Box gap="S">
          <TouchableOpacity style={styles.googleButton} onPressIn={() => console.log("google press")}>
            <Text variant="smallBold" color="white" padding="XS" textAlign="center">
              Sign in using Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("guest press")}>
            <Text color="primaryLight" textAlign="center">
              Continue as a guest
            </Text>
          </TouchableOpacity>
        </Box>
      </View>
    </ImageBackground>
  );
}
