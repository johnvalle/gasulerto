import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useMutation } from "react-query";

import { Box, Text, Wrapper } from "@core/components";
import { VARIABLE_ID } from "@core/constants/api";
import { MEASUREMENTS } from "@core/constants/sensor";
import theme from "@core/constants/theme";
import { useUserStore } from "@core/hooks";
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
  const [latestData, isConnected, lastActive] = useUbidotsStore(state => [
    state.latestData,
    state.isConnected,
    state.lastActive
  ]);

  const isMoreThanMinuteInactive = Boolean(dayjs().diff(dayjs(lastActive), "m"));
  const dataResampleMutation = useMutation(getUbidotsDataResample);
  const [timeResample, setTimeResample] = useState(5);

  useEffect(() => {
    dataResampleMutation.mutateAsync({
      variables: [VARIABLE_ID.GAS],
      aggregation: "mean",
      period: `${timeResample}T`,
      join_dataframes: true,
      start: 1680480000000
    });
  }, [timeResample]);

  const memoizedChart = useMemo(() => {
    if (!dataResampleMutation.isLoading && dataResampleMutation.data) {
      return {
        data: dataResampleMutation.data?.results.map(item => Number(item[1])),
        labels: dataResampleMutation.data?.results.map(item => Number(item[0]))
      };
    }
  }, [dataResampleMutation.data, dataResampleMutation.isLoading]);

  return (
    <Wrapper>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Box gap="sm">
          <Text variant="largeMedium" color="black">
            Dashboard
          </Text>
          <Box>
            <Text color="gray">Welcome back, {name ?? "User"}</Text>
            <Text color="gray">Here's your overview for today.</Text>
          </Box>
          <ChartTimePills
            defaultSelectedTime={15}
            isDisabled={dataResampleMutation.isLoading}
            isLoading={dataResampleMutation.isLoading}
            onClick={setTimeResample}
          />
          {isConnected && !dataResampleMutation.isLoading && memoizedChart ? (
            <SensorDataChart
              chartLabels={memoizedChart.labels}
              chartData={memoizedChart.data}
              chartSymbolSuffix="PPM"
            />
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
            <ScrollView horizontal>
              <Box gap="sm" flexDirection="row">
                {isConnected ? (
                  <>
                    <SensorCardItem iconName="fire" title="Fire" value={getFireDescriptiveValue(latestData.flame)} />
                    <SensorCardItem
                      iconName="gas-cylinder"
                      title="Gas"
                      idealRange="low"
                      {...getGasDescriptiveValue(latestData.gas)}
                    />
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
                  </>
                ) : (
                  <>
                    {Array.from({ length: 2 }).map((_, idx) => (
                      <Skeleton.CardItem key={idx} />
                    ))}
                  </>
                )}
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </ScrollView>
    </Wrapper>
  );
});
