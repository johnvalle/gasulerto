export const THRESHOLD = {
  GAS: 300,
  HUMIDITY: 15,
  TEMPERATURE: 100
} as const;

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
