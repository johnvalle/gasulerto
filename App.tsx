import React from "react";

import { ThemeProvider } from "@shopify/restyle";

import theme from "./src/constants/theme";
import { Login } from "./src/features";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}
