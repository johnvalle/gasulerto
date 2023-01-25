import { ImageBackground, Text, View } from "react-native";

import LoginImage from "@assets/images/login-bg.png";

import LoginForm from "./components/LoginForm";

export function Login() {
  return (
    <View>
      <ImageBackground source={LoginImage} style={{ width: "100%", height: "100%" }} resizeMode="cover">
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: 48,
            paddingHorizontal: 16,
            paddingBottom: 56,
          }}>
          <Text
            style={{
              fontFamily: "Inter-Bold",
              color: "#000000",
              alignSelf: "flex-start",
              textAlign: "center",
              width: "100%",
              paddingTop: 16,
              fontSize: 64,
            }}>
            Gasulerto
          </Text>
          <LoginForm />
        </View>
      </ImageBackground>
    </View>
  );
}
