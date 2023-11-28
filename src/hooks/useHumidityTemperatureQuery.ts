import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { VARIABLE_ID } from "@core/constants/api";
import { getUbidotsDataResample } from "@core/features/Dashboard/api/getUbidotsDataResample";
import { getLastHumidityData } from "@core/features/Dashboard/api/getUbidotsHumidity";
import { getLastTemperatureData } from "@core/features/Dashboard/api/getUbidotsTemperature";

export const useHumidityTemperatureQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000); // default interval set at 3 seconds

  const humidityQuery = useQuery(["humidity"], getLastHumidityData, {
    refetchInterval,
    enabled: refetchInterval > 0,
    onError: () => setRefetchInterval(0)
  });

  const temperatureQuery = useQuery(["temperature"], getLastTemperatureData, {
    refetchInterval,
    enabled: refetchInterval > 0,
    onError: () => setRefetchInterval(0)
  });

  const dataResampleMutation = useMutation(getUbidotsDataResample);

  const hasTemperatureData = temperatureQuery.data?.results && temperatureQuery.data?.results.length > 0;
  const hasHumidityData = humidityQuery.data?.results && humidityQuery.data?.results.length > 0;

  const memoizedChart = useMemo(() => {
    if (!dataResampleMutation.isLoading && dataResampleMutation.data) {
      return {
        data: dataResampleMutation.data?.results.map(item => Number(item[1])),
        labels: dataResampleMutation.data?.results.map(item => Number(item[0]))
      };
    }
  }, [dataResampleMutation.data, dataResampleMutation.isLoading]);

  const updateChart = (timeResample: number) =>
    dataResampleMutation.mutateAsync({
      variables: [VARIABLE_ID.GAS],
      aggregation: "mean",
      period: `${timeResample}T`,
      join_dataframes: true,
      start: dayjs().tz("Asia/Manila").startOf("day").valueOf()
    });

  return {
    updateChart,
    memoizedChart,
    dataResampleMutation,
    humidityQuery,
    temperatureQuery,
    hasTemperatureData,
    hasHumidityData
  };
};
