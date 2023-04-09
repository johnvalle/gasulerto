import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-magnus";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMutation } from "react-query";

import { Box, Text, Wrapper } from "@core/components";
import { VARIABLE_ID } from "@core/constants/api";
import { MEASUREMENTS } from "@core/constants/sensor";
import theme from "@core/constants/theme";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useAuth, useUserStore } from "@core/hooks";
import { useUbidotsStore } from "@core/hooks/useUbidotsStore";
import {
  getFireDescriptiveValue,
  getGasDescriptiveValue,
  getHumidityDescriptiveValue,
  getTemperatureDescriptiveValue
} from "@core/utils/sensor";

import { getUbidotsDataResample } from "../api/getUbidotsDataResample";
import { ChartTimePills } from "./ChartTimePills";
import { SensorCardItem } from "./SensorCardItem";
import { SensorDataChart } from "./SensorDataChart";
import { SensorListItem } from "./SensorListItem";
import * as Skeleton from "./Skeleton";

dayjs.extend(relativeTime);

export const Dashboard = React.memo(() => {
  const { name } = useUserStore();
  const { setIsLoading } = useContext(LoadingContext);
  const { signOut } = useAuth();
  const [latestData, isConnected, lastActive] = useUbidotsStore(state => [
    state.latestData,
    state.isConnected,
    state.lastActive
  ]);

  const isMoreThanMinuteInactive = Boolean(dayjs().diff(dayjs(lastActive), "m"));
  const dataResampleMutation = useMutation(getUbidotsDataResample);
  const [timeResample, setTimeResample] = useState(5);

  const memoizedChart = useMemo(() => {
    if (!dataResampleMutation.isLoading && dataResampleMutation.data) {
      return {
        data: dataResampleMutation.data?.results.map(item => Number(item[1])),
        labels: dataResampleMutation.data?.results.map(item => Number(item[0]))
      };
    }
  }, [dataResampleMutation.data, dataResampleMutation.isLoading]);

  const confirmLogout = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            setIsLoading(true);
            signOut();
          }
        }
      ],
      {
        cancelable: true
      }
    );

  useEffect(() => {
    dataResampleMutation.mutateAsync({
      variables: [VARIABLE_ID.GAS],
      aggregation: "mean",
      period: `${timeResample}T`,
      join_dataframes: true,
      start: dayjs().startOf("day").valueOf()
    });
  }, [timeResample]);

  return (
    <Wrapper>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Box gap="sm">
          <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="largeMedium" color="black">
              Dashboard
            </Text>
            <Button rounded="circle" bg={theme.colors.danger} fontSize={theme.spacing.sm} onPress={confirmLogout}>
              <Icon name="logout" size={theme.spacing.md} color={theme.colors.white} />
            </Button>
          </Box>
          <Box>
            <Text color="gray">Welcome back, {name ?? "User"}</Text>
            <Text color="gray">Here's your overview for today.</Text>
          </Box>
          <ChartTimePills
            defaultSelectedTime={timeResample}
            isDisabled={dataResampleMutation.isLoading}
            isLoading={dataResampleMutation.isLoading}
            onClick={setTimeResample}
          />
          {isConnected && !dataResampleMutation.isLoading && memoizedChart ? (
            <>
              <Box>
                <Text color="black">Gas PPM </Text>
                <Text color="gray">Averaged every {timeResample} minutes</Text>
              </Box>
              <SensorDataChart
                chartLabels={memoizedChart.labels}
                chartData={memoizedChart.data}
                chartSymbolSuffix="PPM"
              />
            </>
          ) : (
            <Skeleton.Chart />
          )}
          <Box borderTopColor="grayLight" borderTopWidth={StyleSheet.hairlineWidth} gap="sm">
            <Box pt="xs">
              <Text color="black">Recent readings</Text>
              {isMoreThanMinuteInactive && (
                <Text color="gray" variant="smallThin">
                  Last updated {dayjs().to(dayjs(lastActive))}
                </Text>
              )}
            </Box>
            <Box>
              {isConnected ? (
                <>
                  <SensorListItem
                    title="Gas"
                    iconName="gas-cylinder"
                    iconColor={theme.colors.warning}
                    value={`${latestData.gas} ${MEASUREMENTS.GAS}`}
                  />
                  <SensorListItem
                    title="Fire"
                    iconName="fire"
                    iconColor={theme.colors.danger}
                    value={getFireDescriptiveValue(latestData.flame)}
                  />
                  <SensorListItem
                    title="Temperature"
                    iconName="thermometer"
                    iconColor={theme.colors.success}
                    value={`${latestData.temperature} ${MEASUREMENTS.TEMPERATURE}`}
                  />
                  <SensorListItem
                    title="Humidity"
                    iconName="water"
                    iconColor={theme.colors.primaryDark}
                    value={`${latestData.humidity} ${MEASUREMENTS.HUMIDITY}`}
                  />
                </>
              ) : (
                Array.from({ length: 4 }).map((_, idx) => <Skeleton.ListItem key={idx} />)
              )}
            </Box>
          </Box>
          <Box gap="sm" paddingBottom="2xl">
            <Text color="black">Sensor summary</Text>
            <Box flex={1} flexDirection="column" gap="xs" mb="md">
              {isConnected ? (
                <>
                  <Box flex={1} flexDirection="row" gap="xs">
                    <SensorCardItem iconName="fire" title="Fire" value={getFireDescriptiveValue(latestData.flame)} />
                    <SensorCardItem
                      iconName="gas-cylinder"
                      title="Gas"
                      idealRange="low"
                      {...getGasDescriptiveValue(latestData.gas)}
                    />
                  </Box>
                  <Box flex={1} flexDirection="row" gap="xs">
                    <SensorCardItem
                      iconName="thermometer"
                      title="Temperature"
                      idealRange="med"
                      {...getTemperatureDescriptiveValue(latestData.temperature)}
                    />
                    <SensorCardItem
                      iconName="water"
                      title="Humidity"
                      idealRange="med"
                      {...getHumidityDescriptiveValue(latestData.humidity)}
                    />
                  </Box>
                </>
              ) : (
                <Box flex={1} flexDirection="row" gap="xs" mb="md">
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <Skeleton.CardItem key={idx} />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Wrapper>
  );
});
