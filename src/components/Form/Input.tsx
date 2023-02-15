import React from "react";
import { InputProps, Input as MagnusInput } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import theme from "@core/constants/theme";

import { Box, Text } from "../Shopify";

type Props = {
  label: string;
  isValid?: boolean;
  helperText?: string;
  errorMessage?: string;
} & InputProps;

export const Input = (props: Props) => {
  const { label, helperText, errorMessage = "This field is required", isValid = true, ...rest } = props;

  const validitySuffixIcon = (
    <Icon
      name={`${isValid ? "check" : "close"}-circle-outline`}
      color={isValid ? theme.colors.success : theme.colors.danger}
    />
  );
  const suffixIcon = props.suffix || validitySuffixIcon;

  return (
    <Box width="100%">
      <Box>
        <Text color="black">{label}</Text>
        {!!helperText && (
          <Text variant="smallThin" color="gray">
            {helperText}
          </Text>
        )}
      </Box>
      <MagnusInput
        placeholder="Enter gas leak threshold"
        my="md"
        h={40}
        borderColor={!isValid ? theme.colors.danger : theme.colors.grayLight}
        focusBorderColor={theme.colors.primary}
        suffix={suffixIcon}
        {...theme.textVariants.defaults}
        {...rest}
      />
      {!isValid && <Text color="danger">{errorMessage}</Text>}
    </Box>
  );
};
