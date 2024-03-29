import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { Box, Text } from "@core/components";
import theme from "@core/constants/theme";
import { getGasDescriptiveValue } from "@core/utils/sensor";

type Props = {
  chartData: number[];
  chartLabels: number[];
  chartSymbolSuffix: string;
};

export const SensorDataChart = React.memo((props: Props) => {
  const { chartData, chartLabels, chartSymbolSuffix } = props;

  const formattedChartLabels = useMemo(() => {
    return chartLabels.map(timeStamp => dayjs(timeStamp).format("h:mm A"));
  }, [chartLabels]);

  const baseChartWidth = Dimensions.get("window").width - theme.spacing.md * 2;
  const columnsCount = 6;
  const widthPerColumn = baseChartWidth / columnsCount;
  const totalSize = widthPerColumn * chartData.length;
  const chartWidth = Math.max(baseChartWidth, totalSize);

  const getDotColor = (data: number) => {
    const { range } = getGasDescriptiveValue(data);

    if (range === "med") {
      return theme.colors.warning;
    }

    if (range === "high") {
      return theme.colors.danger;
    }

    return theme.colors.primary;
  };

  return (
    <ScrollView horizontal>
      <LineChart
        fromZero
        data={{
          labels: formattedChartLabels.reverse(),
          datasets: [
            {
              data: chartData.reverse(),
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
        getDotColor={getDotColor}
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
