import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "react-native-magnus";

import { Box, Input, Text } from "@core/components";
import theme from "@core/constants/theme";
import { UserSettings } from "@core/hooks";
import { Nullable } from "@core/types/generics/nullable";

import { SettingsFormInput } from "../types/SettingsFormInput";

type Props = {
  userSettings: Nullable<UserSettings>;
  onSubmit: (data: UserSettings) => void;
};

export const SettingsForm = (props: Props) => {
  const { userSettings, onSubmit } = props;
  const {
    control,
    formState: { isDirty, errors, isSubmitting },
    handleSubmit
  } = useFormContext<SettingsFormInput>();

  return (
    <Box gap="2xs">
      <Controller
        name="threshold"
        control={control}
        rules={{
          required: true
        }}
        defaultValue={userSettings?.threshold}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Gas leak threshold"
            helperText="Alarms when threshold is exceeded"
            onBlur={onBlur}
            value={value.toString()}
            isValid={!errors?.threshold?.message}
            errorMessage={errors?.threshold?.message}
            onChangeText={text => onChange(Number(text))}
          />
        )}
      />
      <Controller
        name="primaryContact.name"
        control={control}
        rules={{
          required: true
        }}
        defaultValue={userSettings?.primaryContact.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Primary Contact Name"
            helperText="Person to be called when gas leakage occurs"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            isValid={!errors?.primaryContact?.name?.message}
            errorMessage={errors?.primaryContact?.name?.message}
          />
        )}
      />
      <Controller
        name="primaryContact.number"
        control={control}
        rules={{
          required: true,
          maxLength: 10
        }}
        defaultValue={userSettings?.primaryContact.number}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Primary Contact Number"
            helperText="Number to be called when gas leakage occurs"
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
        )}
      />
      {isDirty && (
        <Button loading={isSubmitting} onPress={handleSubmit(onSubmit)} bg={theme.colors.primaryDark} w="100%">
          Save
        </Button>
      )}
    </Box>
  );
};
