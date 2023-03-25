import { useQuery } from "react-query";

import { BaseUbidotsResponse, UbidotsApiQueryParams } from "@coreTypes/ubidots";

import { getFlameData } from "../api/getFlameData";

export const useFlameChartData = (queryParams?: UbidotsApiQueryParams) => {
  return useQuery<BaseUbidotsResponse, Error, Record<"chartLabels" | "chartData", number[]>>({
    queryKey: ["flame", queryParams],
    queryFn: () => getFlameData(),
    select: response => {
      const results = response.results;
      return {
        chartLabels: results.map(({ timestamp }) => timestamp),
        chartData: results.map(({ value }) => value)
      };
    }
  });
};
