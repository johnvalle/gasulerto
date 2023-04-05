import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-magnus";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

type Props = {
  isLoading: boolean;
  isDisabled: boolean;
  defaultSelectedTime: number;
  onClick: (time: number) => void;
};

export const ChartTimePills = (props: Props) => {
  const { isLoading, isDisabled, defaultSelectedTime, onClick } = props;
  const [selectedTime, setSelectedTime] = useState(defaultSelectedTime);

  const handleClick = (value: number) => {
    setSelectedTime(value);
    onClick(value);
  };

  const timeResampleList = [
    {
      value: 3,
      label: "3m"
    },
    {
      value: 5,
      label: "5m"
    },
    {
      value: 15,
      label: "15m"
    },
    {
      value: 30,
      label: "30m"
    },
    {
      value: 60,
      label: "1h"
    },
    {
      value: 120,
      label: "2h"
    }
  ];

  return (
    <Box
      flex={1}
      flexDirection="row"
      gap="2xs"
      borderColor="grayLight"
      borderTopWidth={StyleSheet.hairlineWidth}
      borderBottomWidth={StyleSheet.hairlineWidth}
      py="sm">
      {timeResampleList.map(resample => (
        <Button
          key={resample.value}
          loading={isLoading && resample.value === selectedTime}
          loaderSize={theme.spacing.xs}
          disabled={isDisabled}
          onPress={() => handleClick(resample.value)}
          bg={resample.value === selectedTime ? theme.colors.primaryDark : theme.colors.primaryLight}
          rounded="2xl"
          py={theme.spacing["2xs"]}
          px={theme.spacing.xs}>
          <Text color={resample.value === selectedTime ? "white" : "primaryDark"} variant="extraSmallMedium">
            {resample.label}
          </Text>
        </Button>
      ))}
    </Box>
  );
};
