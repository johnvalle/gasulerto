import React, { PropsWithChildren } from "react";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import theme from "@core/constants/theme";

import { Box, Text, Wrapper } from "../Shopify";

type ErrorBoundaryProps = {} & PropsWithChildren;
type ErrorBoundaryState = {
  hasError: boolean;
  error: string;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    this.setState({ error: JSON.stringify(error) });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Wrapper style={{ backgroundColor: theme.colors.primaryDark }}>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />
          <Box gap="sm">
            <Box>
              <Icon name="emoticon-dead-outline" size={theme.spacing.lg} color={theme.colors.white} />
              <Text variant="largeMedium" color="white" paddingTop="md">
                Oops, something went wrong.
              </Text>
            </Box>
            <Text variant="extraSmallThin" color="white">
              Error: {JSON.stringify(this.state.error)}
            </Text>
          </Box>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}
