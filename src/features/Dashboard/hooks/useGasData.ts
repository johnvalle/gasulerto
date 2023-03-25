import { useQuery } from "react-query";

import { BaseUbidotsResponse, UbidotsApiQueryParams } from "@coreTypes/ubidots";

import { getGasData } from "./../api/getGasData";

export const useGasChartData = (queryParams?: UbidotsApiQueryParams) => {
  return useQuery<BaseUbidotsResponse, Error, Record<"chartLabels" | "chartData", number[]>>({
    queryKey: ["gas", queryParams],
    queryFn: () => getGasData(),
    select: response => {
      const results = response.results;
      return {
        chartLabels: results.map(({ timestamp }) => timestamp),
        chartData: results.map(({ value }) => value)
      };
    }
  });
};
