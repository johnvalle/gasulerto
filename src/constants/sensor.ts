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
