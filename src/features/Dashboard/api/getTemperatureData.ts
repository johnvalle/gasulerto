import { UbidotsApiQueryParams } from "@coreTypes/ubidots";
import { BaseUbidotsResponse } from "@coreTypes/ubidots";

import { ubidotsApi } from "@utils/api";

export const getTemperatureData = async (queryParams?: UbidotsApiQueryParams): Promise<BaseUbidotsResponse> => {
  try {
    const response = await ubidotsApi.get("/devices/arduino-gasulerto/temperature/values", { params: queryParams });
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to retrieve temperature data");
  }
};
