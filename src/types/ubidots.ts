import { NullSafe } from "firebase-functions/lib/common/params";

import { Nullable } from "./generics/nullable";

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

export type BaseResult<T> = {
  time: number;
  value: number;
  context: T;
  created_at: number;
};

export type DeviceVariableResponse = {
  count: boolean;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: BaseResult<null>[];
};
