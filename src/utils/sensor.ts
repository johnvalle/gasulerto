import { SensorRange } from "@core/features/Dashboard/types/components";

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
  const config = {
    low: {
      range: [0, 300],
      description: "Low concentration"
    },
    med: {
      range: [301, 500],
      description: "Medium concentration "
    },
    high: {
      range: [501, 1000],
      description: "High concentration"
    }
  };
  return getSensorDescriptiveValue(config, value);
};

export const getFireDescriptiveValue = (value: number) => {
  if (value === 0) {
    return "Fire detected";
  } else {
    return "None";
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
