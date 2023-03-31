import React from "react";
import { ScrollView } from "react-native";
import { useQueryClient } from "react-query";
import MQTT from "sp-react-native-mqtt";

import { Box, Text, Wrapper } from "@core/components";
import { SENSOR_TYPES } from "@core/constants/sensor";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useUserStore } from "@core/hooks";

import { UBIDOTS_API_KEY } from "@env";

import { useSensorData } from "../hooks/useSensorData";
import { SensorCardItem } from "./SensorCardItem";
import { SensorDataChart } from "./SensorDataChart";
import { SensorListItem } from "./SensorListItem";
import * as Skeleton from "./Skeleton";

export const Dashboard = () => {
  const { name } = useUserStore();
  const userName = name ?? "User";

  const { setIsLoading } = React.useContext(LoadingContext);
  const {
    sensorData: { gas },
    latestData,
    isSensorDataReady,
    getSensorDescriptiveValue,
    getSensorNumericValue
  } = useSensorData();

  const fireDescription = latestData.fire ? "Fire detected" : "None";

  // establish mqtt connection
  // once connected, retrieve last dot data over http
  // subscribe to last dot over mqtt
  // on subscribe, if data received, invalidate queries or update data in client
  const queryClient = useQueryClient();
  /* create mqtt client */
  MQTT.createClient({
    uri: "mqtt://industrial.api.ubidots.com:1883",
    clientId: "gasulerto",
    auth: true,
    user: UBIDOTS_API_KEY,
    pass: ""
  })
    .then(function (client) {
      client.on("closed", function () {
        console.log("mqtt.event.closed");
      });

      client.on("error", function (msg) {
        console.log("mqtt.event.error", msg);
      });

      client.on("message", function (msg) {
        console.log("mqtt.event.message", msg);
        queryClient.invalidateQueries({ queryKey: ["temperature", "humidity"] });
      });

      client.on("connect", function () {
        console.log("connected");
        // client.publish("/v1.6/devices/arduino-gasulerto/fire", "0", 0, false);
        // client.publish("/v1.6/devices/arduino-gasulerto/temperature", "37.2", 0, false);
        client.subscribe("/v1.6/devices/arduino-gasulerto/temperature", 0);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });

  React.useEffect(() => {
    if (isSensorDataReady && gas.data) {
      setIsLoading(false);
    }
  }, [isSensorDataReady, setIsLoading, gas.data]);

  return (
    <Wrapper>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Box gap="sm">
          <Text variant="mediumBold" color="black">
            Dashboard
          </Text>
          <Text color="gray">Good to see you're safe, {userName}</Text>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text color="black">Overview</Text>
          </Box>
          {(!isSensorDataReady || !gas.data) && <Skeleton.Chart />}
          {isSensorDataReady && gas.data && (
            <SensorDataChart
              chartLabels={gas.data.chartLabels}
              chartData={gas.data.chartData}
              chartSymbolSuffix="PPM"
            />
          )}
          <Box gap="sm">
            <Text color="gray">Recent readings</Text>
            <Box>
              {isSensorDataReady ? (
                <>
                  <SensorListItem title="Gas" {...getSensorNumericValue(SENSOR_TYPES.GAS, latestData.gas)} />
                  <SensorListItem title="Fire" value={fireDescription} isHigh={Boolean(latestData.fire)} />
                  <SensorListItem
                    title="Temperature"
                    {...getSensorNumericValue(SENSOR_TYPES.TEMPERATURE, latestData.temperature)}
                  />
                  <SensorListItem
                    title="Humidity"
                    {...getSensorNumericValue(SENSOR_TYPES.HUMIDITY, latestData.humidity)}
                  />
                </>
              ) : (
                Array.from({ length: 4 }).map((_, idx) => <Skeleton.ListItem key={idx} />)
              )}
            </Box>
          </Box>
          <Box gap="sm" paddingBottom="2xl">
            <Text color="gray">Sensor summary</Text>
            <ScrollView horizontal>
              <Box gap="sm" flexDirection="row">
                {isSensorDataReady ? (
                  <>
                    <SensorCardItem
                      iconName="fire"
                      title="Fire"
                      value={fireDescription}
                      isHigh={Boolean(latestData.fire)}
                    />
                    <SensorCardItem
                      iconName="gas-cylinder"
                      title="Gas"
                      {...getSensorDescriptiveValue(SENSOR_TYPES.GAS, latestData.gas)}
                    />
                    <SensorCardItem
                      iconName="thermometer"
                      title="Temperature"
                      {...getSensorDescriptiveValue(SENSOR_TYPES.TEMPERATURE, latestData.temperature)}
                    />
                    <SensorCardItem
                      iconName="water"
                      title="Humidity"
                      {...getSensorDescriptiveValue(SENSOR_TYPES.HUMIDITY, latestData.humidity)}
                    />
                  </>
                ) : (
                  <>
                    {Array.from({ length: 2 }).map((_, idx) => (
                      <Skeleton.CardItem key={idx} />
                    ))}
                  </>
                )}
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </ScrollView>
    </Wrapper>
  );
};
