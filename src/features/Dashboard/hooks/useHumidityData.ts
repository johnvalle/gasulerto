import { useQuery } from "react-query";

import { BaseUbidotsResponse, UbidotsApiQueryParams } from "@coreTypes/ubidots";

import { getHumidityData } from "./../api/getHumidityData";

export const useHumidityChartData = (queryParams?: UbidotsApiQueryParams) => {
  return useQuery<BaseUbidotsResponse, Error, Record<"chartLabels" | "chartData", number[]>>({
    queryKey: ["humidity", queryParams],
    queryFn: () => getHumidityData(),
    select: response => {
      const results = response.results;
      return {
        chartLabels: results.map(({ timestamp }) => timestamp),
        chartData: results.map(({ value }) => value)
      };
    }
  });
};
