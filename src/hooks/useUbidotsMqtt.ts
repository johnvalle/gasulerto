import dayjs from "dayjs";
import { useEffect } from "react";
import MQTT, { Message } from "sp-react-native-mqtt";

import { MQTT_TOPIC, MQTT_URL } from "@core/constants/api";
import { useUbidotsStore } from "@core/hooks/useUbidotsStore";
import { UbidotsStore } from "@core/hooks/useUbidotsStore";

import { UBIDOTS_API_KEY } from "@env";

export const useUbidotsMqtt = () => {
  const { lastActive, setLastActive, setHasGasLeak, setLatestData, setIsConnected } = useUbidotsStore.getState();

  const handleSensorData = (msg: Message) => {
    let obj = {} as Partial<UbidotsStore["latestData"]>;

    const time = JSON.parse(msg.data).timestamp;
    const isSavedDataOld = dayjs(lastActive).isBefore(JSON.parse(msg.data).timestamp);
    if (isSavedDataOld || !lastActive) {
      setLastActive(time);
    }
    const data = Number(JSON.parse(msg.data).value);
    switch (msg.topic) {
      case MQTT_TOPIC.GAS:
        obj = { gas: data };
        break;
      case MQTT_TOPIC.HUMIDITY:
        obj = { humidity: data };
        break;
      case MQTT_TOPIC.TEMPERATURE:
        obj = { temperature: data };
        break;
      case MQTT_TOPIC.FLAME:
        obj = { flame: data };
        break;
      default:
        break;
    }
    setLatestData(obj);
  };

  const setupMqttClient = async () => {
    try {
      const mqttClient = await MQTT.createClient({
        uri: MQTT_URL,
        clientId: `gasulerto-client-${Math.random()}`,
        auth: true,
        user: UBIDOTS_API_KEY,
        pass: "",
        keepalive: 300
      });

      mqttClient.on("closed", function () {
        console.log("mqtt.event.closed");
      });

      mqttClient.on("error", function (msg) {
        console.log("mqtt.event.error", msg);
        mqttClient.reconnect();
      });

      mqttClient.on("message", (msg: Message) => {
        if (![MQTT_TOPIC.IS_DEVICE_ACTIVE, MQTT_TOPIC.HAS_GAS_LEAK].includes(msg.topic)) {
          handleSensorData(msg);
        }

        if (msg.topic === MQTT_TOPIC.IS_DEVICE_ACTIVE) {
          setIsConnected(true);
        }

        if (msg.topic === MQTT_TOPIC.HAS_GAS_LEAK) {
          setHasGasLeak(Boolean(Number(msg.data)));
        }
      });

      mqttClient.on("connect", function () {
        console.log("mqtt.event.connected");

        mqttClient.subscribe(MQTT_TOPIC.FLAME, 1);
        mqttClient.subscribe(MQTT_TOPIC.GAS, 1);
        mqttClient.subscribe(MQTT_TOPIC.IS_DEVICE_ACTIVE, 1);
      });

      mqttClient.connect();
    } catch (error) {
      console.error("Failed to create mqtt client", error);
    }
  };

  useEffect(() => {
    setupMqttClient();
  }, []);
};
