import React from "react";
import { StatusBar } from "react-native";

import { ThemeProvider } from "@shopify/restyle";

import { ErrorBoundary } from "@core/components";
import { AppNavigation } from "@core/navigation/AppNavigation";

import theme from "@constants/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFFFFF"} />
      <ErrorBoundary>
        <AppNavigation />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
