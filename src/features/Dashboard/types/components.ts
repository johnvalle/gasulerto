export type SensorRange = "low" | "med" | "high";

export type SensorData = {
  title: string;
  value: string;
};

export type ChartProps = { chartLabels: number[]; chartData: number[] };
