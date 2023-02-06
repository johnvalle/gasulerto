import React from "react";
import { StatusBar } from "react-native";

import { ThemeProvider } from "@shopify/restyle";

import { NavigationContainer } from "@react-navigation/native";

import { ErrorBoundary } from "@core/components";
import useUserStore from "@core/hooks/useUserStore";
import AuthenticatedStack from "@core/navigation/AuthenticatedStack";
import UnauthenticatedStack from "@core/navigation/UnauthenticatedStack";

import theme from "@constants/theme";

export default function App() {
  const { token } = useUserStore();
  const isLoggedIn = !!token;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFFFFF"} />
      <ErrorBoundary>
        <NavigationContainer>{isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}</NavigationContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
