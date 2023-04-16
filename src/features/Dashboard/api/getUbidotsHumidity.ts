import { DeviceVariableResponse } from "@core/types/ubidots";
import { ubidotsApi } from "@core/utils/api";

export const getLastHumidityData = async (): Promise<DeviceVariableResponse> => {
  try {
    const response = await ubidotsApi.get("/devices/arduino-gasulerto/humidity/values", { params: { page_size: 1 } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to retrieve humidity data");
  }
};
