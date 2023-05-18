import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box, Input, Text } from "@core/components";
import { THRESHOLD } from "@core/constants/sensor";
import theme from "@core/constants/theme";
import { UserSettings, useUserStore } from "@core/hooks";
import { Nullable } from "@core/types/generics/nullable";

import { SettingsFormInput } from "../types/SettingsFormInput";

type Props = {
  userSettings: Nullable<UserSettings>;
};

export const SettingsForm = (props: Props) => {
  const { isAnonymous } = useUserStore();
  const { userSettings } = props;
  const {
    control,
    formState: { errors },
    setValue
  } = useFormContext<SettingsFormInput>();

  const renderFixedContent = ({ label, helperText, value }: Record<"label" | "helperText" | "value", string>) => {
    return (
      <Box borderBottomWidth={StyleSheet.hairlineWidth} borderColor="grayLight" pb="xs" gap="xs">
        <Text color="gray" variant="smallBold">
          {value}
        </Text>
        <Box flex={2}>
          <Text color="black">{label}</Text>
          <Text color="gray" variant="smallThin">
            {helperText}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box gap="xs">
      <Controller
        name="threshold"
        control={control}
        rules={{
          required: true
        }}
        defaultValue={userSettings?.threshold}
        render={({ field: { value } }) => {
          const label = "Gas leak threshold";
          const helperText = "Lower value indicates early alarms";
          return isAnonymous ? (
            renderFixedContent({ label, helperText, value: `${value} PPM` })
          ) : (
            <Box gap="xs">
              <Box>
                <Text color="black">{label}</Text>
                <Text color="gray" variant="smallThin">
                  {helperText}
                </Text>
              </Box>
              <Box gap="2xs" flex={1} flexDirection="column" justifyContent="flex-start">
                {THRESHOLD.GAS_LIST.map((gasThreshold, idx) => (
                  <TouchableOpacity
                    key={`${gasThreshold}-${idx}`}
                    onPress={() => setValue("threshold", gasThreshold, { shouldDirty: true })}>
                    <Box flex={1} flexDirection="row" alignItems="center" gap="2xs">
                      <Icon
                        name={gasThreshold === value ? "checkbox-marked-circle" : "radiobox-blank"}
                        color={gasThreshold === value ? theme.colors.success : theme.colors.gray}
                        size={theme.spacing.md}
                      />
                      <Text color="black" variant={gasThreshold === value ? "smallBold" : undefined}>
                        {gasThreshold} PPM
                      </Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Box>
            </Box>
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
              prefix={value !== "911" && <Text color="gray">+63</Text>}
            />
          );
        }}
      />
    </Box>
  );
};
