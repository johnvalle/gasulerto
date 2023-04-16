export const UBIDOTS_API_URL = "https://industrial.api.ubidots.com/api/v1.6";
export const MQTT_URL = "mqtt://industrial.api.ubidots.com:1883";
export const MQTT_CLIENT_ID = "gasulerto";

export const MQTT_BASE_TOPIC_URL = "/v1.6/devices/arduino-gasulerto";
export const MQTT_TOPIC = {
  GAS: `${MQTT_BASE_TOPIC_URL}/gas`,
  TEMPERATURE: `${MQTT_BASE_TOPIC_URL}/temperature`,
  HUMIDITY: `${MQTT_BASE_TOPIC_URL}/humidity`,
  FLAME: `${MQTT_BASE_TOPIC_URL}/flame`,
  IS_DEVICE_ACTIVE: `${MQTT_BASE_TOPIC_URL}/isdeviceactive`,
  HAS_GAS_LEAK: `${MQTT_BASE_TOPIC_URL}//v1.6/devices/arduino-gasulerto/hasgasleak`
};

export const VARIABLE_ID = {
  GAS: "642920a0e7464d000d979660"
};
