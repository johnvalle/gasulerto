import { DataResamplePayload, DataResampleResponse } from "@core/types/ubidots";
import { ubidotsApi } from "@core/utils/api";

export const getUbidotsDataResample = async (data: DataResamplePayload): Promise<DataResampleResponse> => {
  try {
    const response = await ubidotsApi.post("/data/stats/resample/", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to retrieve gas value");
  }
};
