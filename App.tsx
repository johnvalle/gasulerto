import React from "react";
import { StatusBar } from "react-native";

import { ThemeProvider } from "@shopify/restyle";

import { NavigationContainer } from "@react-navigation/native";

import { ErrorBoundary, Loader } from "@core/components";
import { useLoading } from "@core/hooks";
import useUserStore from "@core/hooks/useUserStore";
import AuthenticatedStack from "@core/navigation/AuthenticatedStack";
import UnauthenticatedStack from "@core/navigation/UnauthenticatedStack";

import theme from "@constants/theme";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!useUserStore.getState().token);
  const { isLoading, setIsLoading } = useLoading(true);

  const unsubcribe = useUserStore.persist.onFinishHydration(state => {
    setIsLoggedIn(!!state.token);
    setIsLoading(false);
    unsubcribe();
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFFFFF"} />
      <ErrorBoundary>
        {isLoading ? <Loader /> : null}
        <NavigationContainer>{isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}</NavigationContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
