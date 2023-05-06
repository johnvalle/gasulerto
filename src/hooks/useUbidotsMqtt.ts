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
    try {
      let obj = {} as Partial<UbidotsStore["latestData"]>;
      const data = typeof msg.data === "string" && !!msg.data ? JSON.parse(msg.data) : {};
      const time = data.timestamp;
      const isSavedDataOld = dayjs(lastActive).isBefore(time);
      if (isSavedDataOld || !lastActive) {
        setLastActive(time);
      }

      const value = Number(data.value);
      switch (msg.topic) {
        case MQTT_TOPIC.GAS:
          obj = { gas: value };
          break;
        case MQTT_TOPIC.HUMIDITY:
          obj = { humidity: value };
          break;
        case MQTT_TOPIC.TEMPERATURE:
          obj = { temperature: value };
          break;
        case MQTT_TOPIC.FLAME:
          obj = { flame: value };
          break;
        default:
          break;
      }
      setLatestData(obj);
    } catch (error) {
      console.error({ error });
    }
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
          setIsConnected(true);
          handleSensorData(msg);
        }

        if (msg.topic === MQTT_TOPIC.HAS_GAS_LEAK) {
          setHasGasLeak(Boolean(Number(msg.data)));
        }
      });

      mqttClient.on("connect", function () {
        console.log("mqtt.event.connected");

        mqttClient.subscribe(MQTT_TOPIC.FLAME, 1);
        mqttClient.subscribe(MQTT_TOPIC.GAS, 1);
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
