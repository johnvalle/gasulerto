import { SensorRange } from "@core/features/Dashboard/types/components";
import { useUserStore } from "@core/hooks";

type SensorValuesMap = Record<
  SensorRange,
  {
    range: number[];
    description: string;
  }
>;

export const getSensorDescriptiveValue = (
  config: SensorValuesMap,
  value: number
): { value: string; range?: SensorRange } => {
  const { low, med, high } = config;

  if (value <= low.range[0] || value <= low.range[1]) {
    return {
      value: low.description,
      range: "low"
    };
  }

  if (value >= med.range[0] && value <= med.range[1]) {
    return {
      value: med.description,
      range: "med"
    };
  }

  if (value >= high.range[0] || value >= high.range[1]) {
    return {
      value: high.description,
      range: "high"
    };
  }

  return {
    value: ""
  };
};

export const getGasDescriptiveValue = (value: number) => {
  const minThreshold = Number(useUserStore.getState().threshold);
  const thresholdMediumMaxRange = minThreshold - 250;

  const config = {
    low: {
      range: [0, thresholdMediumMaxRange - 1],
      description: "Low concentration"
    },
    med: {
      range: [thresholdMediumMaxRange, minThreshold - 1],
      description: "Medium concentration "
    },
    high: {
      range: [minThreshold, 10000],
      description: "High concentration"
    }
  };
  return getSensorDescriptiveValue(config, value);
};

export const getFireDescriptiveValue = (value: number) => {
  if (value === 0) {
    return {
      value: "Fire detected",
      range: "high" as SensorRange
    };
  } else {
    return {
      value: "None",
      range: "low" as SensorRange
    };
  }
};

export const getHumidityDescriptiveValue = (value: number) => {
  const config = {
    low: {
      range: [0, 20],
      description: "Too dry"
    },
    med: {
      range: [21, 60],
      description: "Normal"
    },
    high: {
      range: [61, 100],
      description: "Too humid"
    }
  };
  return getSensorDescriptiveValue(config, value);
};

export const getTemperatureDescriptiveValue = (value: number) => {
  const config = {
    low: {
      range: [0, 25],
      description: "Freezing to Cold"
    },
    med: {
      range: [26, 50],
      description: "Cool to Warm"
    },
    high: {
      range: [50, 100],
      description: "Hot"
    }
  };
  return getSensorDescriptiveValue(config, value);
};
