import React from "react";
import { StatusBar } from "react-native";

import { ThemeProvider } from "@shopify/restyle";

import { NavigationContainer } from "@react-navigation/native";

import AuthenticatedStack from "@core/navigation/AuthenticatedStack";
import UnauthenticatedStack from "@core/navigation/UnauthenticatedStack";

import theme from "@constants/theme";

export default function App() {
  const isLoggedIn = true;
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFFFFF"} />
      <NavigationContainer>{isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}</NavigationContainer>
    </ThemeProvider>
  );
}
