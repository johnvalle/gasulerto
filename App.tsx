import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider as MagnusUIProvider } from "react-native-magnus";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@shopify/restyle";

import { ErrorBoundary } from "@core/components";
import { AppNavigation } from "@core/navigation/AppNavigation";

import theme from "@constants/theme";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MagnusUIProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <ErrorBoundary>
            <AppNavigation />
          </ErrorBoundary>
        </MagnusUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
