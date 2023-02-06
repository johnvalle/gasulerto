import { ScrollView } from "react-native";

import { Box, Text, Wrapper } from "@core/components";

import { SensorCardItem } from "./SensorCardItem";
import { SensorListItem } from "./SensorListItem";

export const Dashboard = () => {
  return (
    <Wrapper>
      <Box width="100%" gap="sm">
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
