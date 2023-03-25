import { SENSOR_TYPES, THRESHOLD } from "./../constants/sensor";

export const isThresholdExceeded = (sensorKey: SENSOR_TYPES, value: number) => {
  const thresholdValue = THRESHOLD[sensorKey];
  const isLowList = [SENSOR_TYPES.GAS, SENSOR_TYPES.TEMPERATURE];
  const isHighList = [SENSOR_TYPES.HUMIDITY];

  // if value is in the list where value should be low
  // check if value is exceeded
  if (isLowList.includes(sensorKey)) {
    return value >= thresholdValue;
  }

  // if value is in the list where value should be high
  // check if value is falling behind
  if (isHighList.includes(sensorKey)) {
    return value <= thresholdValue;
  }

  return false;
};
