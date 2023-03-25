import { BaseUbidotsResponse } from "@coreTypes/ubidots";

import { ubidotsApi } from "@utils/api";

export const getHumidityData = async (): Promise<BaseUbidotsResponse> => {
  try {
    const response = await ubidotsApi.get("/devices/arduino-gasulerto/humidity/values");
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to retrieve humidity data");
  }
};
