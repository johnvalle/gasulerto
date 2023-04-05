export type DataResamplePayload = {
  variables: string[];
  aggregation: string;
  period: string;
  join_dataframes: boolean;
  start?: number;
  end?: number;
};

export type DataResampleResponse = {
  results: Array<(number | null)[]>;
  columns: string[];
};
