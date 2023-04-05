import dayjs from "dayjs";
import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";

type Props = {
  chartData: number[];
  chartLabels: number[];
  chartSymbolSuffix: string;
};

export const SensorDataChart = React.memo((props: Props) => {
  const { chartData, chartLabels, chartSymbolSuffix } = props;

  const formattedChartLabels = chartLabels.length
    ? chartLabels.map(timeStamp => dayjs(timeStamp).format("h:mm A"))
    : [];

  const baseChartWidth = Dimensions.get("window").width - theme.spacing.md * 2;
  const columnsCount = 6;
  const widthPerColumn = baseChartWidth / columnsCount;
  const totalSize = widthPerColumn * chartData.length;
  const chartWidth = Math.max(baseChartWidth, totalSize);

  return (
    <ScrollView horizontal>
      <LineChart
        fromZero
        data={{
          labels: formattedChartLabels,
          datasets: [
            {
              data: chartData,
              color: () => theme.colors.primaryDark,
              strokeDashArray: [4],
              strokeWidth: 1
            }
          ]
        }}
        renderDotContent={params => {
          return (
            <Box key={params.index} position="absolute" style={{ top: params.y - 18, left: params.x }}>
              <Text color="gray" variant="extraSmallMedium">
                {params.indexData.toFixed(1)}
              </Text>
            </Box>
          );
        }}
        width={chartWidth}
        height={240}
        withShadow={false}
        yAxisSuffix={` ${chartSymbolSuffix}`}
        chartConfig={{
          strokeWidth: 2,
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 1,
          propsForBackgroundLines: {
            strokeWidth: StyleSheet.hairlineWidth,
            stroke: theme.colors.grayLight
          },
          propsForLabels: {
            fontSize: theme.spacing["2xs"],
            fill: theme.colors.grayLight
          },
          color: () => theme.colors.primary,
          labelColor: () => theme.colors.gray
        }}
      />
    </ScrollView>
  );
});
