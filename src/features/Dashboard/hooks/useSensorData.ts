import { MEASUREMENTS } from "@core/constants/sensor";
import { isThresholdExceeded } from "@core/utils/boolean";

import { useFlameChartData } from "./useFlameData";
import { useGasChartData } from "./useGasData";
import { useHumidityChartData } from "./useHumidityData";
import { useTemperatureChartData } from "./useTemperatureData";

export const useSensorData = () => {
  const getSensorDescriptiveValue = (...args: Parameters<typeof isThresholdExceeded>) => {
    const isHigh = isThresholdExceeded(...args);
    const value = `${isHigh ? "High" : "Low"} Concentration`;
    return {
      isHigh,
      value
    };
  };

  const getSensorNumericValue = (...args: Parameters<typeof isThresholdExceeded>) => {
    const sensorKey = args[0];
    const sensorData = args[1];
    const isHigh = isThresholdExceeded(...args);
    const value = `${sensorData} ${MEASUREMENTS[sensorKey]}`;
    return {
      isHigh,
      value
    };
  };

  const temperatureData = useTemperatureChartData();
  const latestTemperatureData = temperatureData.data?.chartData.length ? temperatureData.data?.chartData[0] : 0;
  const isTemperatureDataReady = !!temperatureData.data && !temperatureData.isLoading;

  const humidityData = useHumidityChartData();
  const latestHumidityData = humidityData.data?.chartData.length ? humidityData.data?.chartData[0] : 0;
  const isHumidityDataReady = !!humidityData.data && !humidityData.isLoading;

  const flameData = useFlameChartData();
  const latestFlameData = flameData.data?.chartData.length ? flameData.data?.chartData[0] : 0;
  const isFlameDataReady = !!flameData.data && !flameData.isLoading;

  const gasData = useGasChartData();
  const latestGasData = gasData.data?.chartData.length ? gasData.data?.chartData[0] : 0;
  const isGasDataReady = !!gasData.data && !gasData.isLoading;

  const isSensorDataReady = isTemperatureDataReady && isHumidityDataReady && isFlameDataReady && isGasDataReady;

  const latestData = {
    temperature: latestTemperatureData,
    gas: latestGasData,
    humidity: latestHumidityData,
    fire: latestFlameData
  };

  const sensorData = {
    gas: gasData,
    temperature: temperatureData,
    fire: flameData,
    humidity: humidityData
  };

  return {
    sensorData,
    latestData,
    isSensorDataReady,
    getSensorDescriptiveValue,
    getSensorNumericValue
  };
};
