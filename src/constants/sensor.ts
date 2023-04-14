export const MEASUREMENTS = {
  GAS: "PPM",
  HUMIDITY: "%",
  TEMPERATURE: "°C"
} as const;

export enum SENSOR_TYPES {
  GAS = "GAS",
  HUMIDITY = "HUMIDITY",
  TEMPERATURE = "TEMPERATURE"
}

export const THRESHOLD = {
  GAS: 1000,
  GAS_LIST: [1000, 2000]
};
