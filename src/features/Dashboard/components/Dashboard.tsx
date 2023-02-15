import React from "react";
import { ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";

import { Box, Text, Wrapper } from "@core/components";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useUserStore } from "@core/hooks";

import { SensorCardItem } from "./SensorCardItem";
import { SensorListItem } from "./SensorListItem";

export const Dashboard = () => {
  const { name } = useUserStore();
  const userName = name ?? "User";

  const dashboardData = firestore().collection("dashboard").doc("sensor");
  const { setIsLoading } = React.useContext(LoadingContext);

  const getDashboardData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await dashboardData.get();
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardData, setIsLoading]);

  React.useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <Wrapper>
      <Box width="100%" gap="sm">
        <Text variant="mediumBold" color="black" marginVertical="md">
          Dashboard
        </Text>
        <Text color="gray">Good to see you're safe, {userName}</Text>
        <Text color="black">Overview</Text>
        <Box gap="sm">
          <Text color="gray">Recent readings</Text>
          <Box>
            <SensorListItem title="Gas" value="100 PPM" isHigh={false} />
            <SensorListItem title="Fire" value="None" isHigh={false} />
            <SensorListItem title="Temperature" value="28°C" isHigh />
            <SensorListItem title="Humidity" value="24%" isHigh={false} />
          </Box>
        </Box>
        <Box gap="sm">
          <Text color="gray">Sensor summary</Text>
          <ScrollView horizontal>
            <Box gap="sm" flexDirection="row">
              <SensorCardItem iconName="gas-cylinder" title="Gas" value="Low concentration" isHigh={false} />
              <SensorCardItem iconName="fire" title="Fire" value="Fire detected" isHigh />
              <SensorCardItem iconName="thermometer" title="Temperature" value="Low concentration" isHigh={false} />
              <SensorCardItem iconName="water" title="Humidity" value="Low concentration" isHigh={false} />
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </Wrapper>
  );
};
