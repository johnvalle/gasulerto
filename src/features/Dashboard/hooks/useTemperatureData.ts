import { useQuery } from "react-query";

import { BaseUbidotsResponse, UbidotsApiQueryParams } from "@coreTypes/ubidots";

import { getTemperatureData } from "../api/getTemperatureData";

export const useTemperatureChartData = (queryParams?: UbidotsApiQueryParams) => {
  return useQuery<BaseUbidotsResponse, Error, Record<"chartLabels" | "chartData", number[]>>({
    queryKey: ["temperature", queryParams],
    queryFn: () => getTemperatureData(queryParams),
    select: response => {
      const results = response.results;
      return {
        chartLabels: results.map(({ timestamp }) => timestamp),
        chartData: results.map(({ value }) => value)
      };
    }
  });
};
