import { Nullable } from "@coreTypes/generics/nullable";

export type UbidotsApiQueryParams = {
  page_size?: number;
  start_date?: number;
};

export type BaseUbidotsResults = {
  created_at: number;
  timestamp: number;
  value: number;
};

export type BaseUbidotsResponse = {
  next: Nullable<string>;
  previous: Nullable<string>;
  results: BaseUbidotsResults[];
};
