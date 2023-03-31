import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-magnus";

import { Box, Input, Text } from "@core/components";
import theme from "@core/constants/theme";
import { UserSettings, useUserStore } from "@core/hooks";
import { Nullable } from "@core/types/generics/nullable";

import { SettingsFormInput } from "../types/SettingsFormInput";

type Props = {
  userSettings: Nullable<UserSettings>;
  onSubmit: (data: UserSettings) => void;
};

export const SettingsForm = (props: Props) => {
  const { isAnonymous } = useUserStore();
  const { userSettings, onSubmit } = props;
  const {
    control,
    formState: { isDirty, errors, isSubmitting },
    handleSubmit
  } = useFormContext<SettingsFormInput>();

  const renderFixedContent = ({ label, helperText, value }: Record<"label" | "helperText" | "value", string>) => {
    return (
      <Box flex={1} gap="xs">
        <Box>
          <Text color="black">{label}</Text>
          <Text color="gray" variant="smallThin">
            {helperText}
          </Text>
        </Box>
        <Box borderWidth={StyleSheet.hairlineWidth} borderColor="grayLight" borderRadius={theme.spacing["2xs"]} p="xs">
          <Text color="gray">{value}</Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box gap="2xs">
      <Controller
        name="threshold"
        control={control}
        rules={{
          required: true
        }}
        defaultValue={userSettings?.threshold}
        render={({ field: { onChange, onBlur, value } }) => {
          const label = "Gas leak threshold";
          const helperText = "Alarms when threshold is exceeded";
          return isAnonymous ? (
            renderFixedContent({ label, helperText, value: value?.toString() })
          ) : (
            <Input
              label={label}
              helperText={helperText}
              onBlur={onBlur}
              value={value?.toString()}
              isValid={!errors?.threshold?.message}
              errorMessage={errors?.threshold?.message}
              onChangeText={text => onChange(text ? Number(text) : "")}
            />
          );
        }}
      />
      <Controller
        name="primaryContact.name"
        control={control}
        rules={{
          required: true
        }}
        defaultValue={userSettings?.primaryContact.name}
        render={({ field: { onChange, onBlur, value } }) => {
          const label = "Primary Contact Name";
          const helperText = "Person to be called when gas leakage occurs";
          return isAnonymous ? (
            renderFixedContent({ label, helperText, value })
          ) : (
            <Input
              label={label}
              helperText={helperText}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isValid={!errors?.primaryContact?.name?.message}
              errorMessage={errors?.primaryContact?.name?.message}
            />
          );
        }}
      />
      <Controller
        name="primaryContact.number"
        control={control}
        rules={{
          required: true,
          maxLength: 10
        }}
        defaultValue={userSettings?.primaryContact.number}
        render={({ field: { onChange, onBlur, value } }) => {
          const label = "Primary Contact Number";
          const helperText = "Number to be called when gas leakage occurs";
          return isAnonymous ? (
            renderFixedContent({ label, helperText, value })
          ) : (
            <Input
              label={label}
              helperText={helperText}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isValid={!errors?.primaryContact?.number?.message}
              errorMessage={errors?.primaryContact?.number?.message}
              maxLength={10}
              prefix={
                value !== "911" && (
                  <Text color="gray" lineHeight={18}>
                    +63
                  </Text>
                )
              }
            />
          );
        }}
      />
      {isDirty && (
        <Button loading={isSubmitting} onPress={handleSubmit(onSubmit)} bg={theme.colors.primaryDark} w="100%">
          Save
        </Button>
      )}
    </Box>
  );
};
