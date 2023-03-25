import axios from "axios";

import { UBIDOTS_API_KEY } from "@env";

import { UBIDOTS_API_URL } from "./../constants/api";

export const ubidotsApi = axios.create({
  baseURL: UBIDOTS_API_URL,
  headers: {
    "X-Auth-Token": UBIDOTS_API_KEY,
    "Content-Type": "application/json"
  }
});
