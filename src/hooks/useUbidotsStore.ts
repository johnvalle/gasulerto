import { create } from "zustand";

import { Nullable } from "@core/types/generics/nullable";

type UbidotsSensorData = {
  temperature: number;
  humidity: number;
  gas: number;
  flame: number;
};

type Ubidots = {
  isConnected: boolean;
  hasGasLeak: boolean;
  lastActive: Nullable<number>;
  latestData: UbidotsSensorData;
};

export type UbidotsStore = {
  setLatestData: (latestData: Partial<Ubidots["latestData"]>) => void;
  setLastActive: (lastActive: number) => void;
  setIsConnected: (isConnected: boolean) => void;
  setHasGasLeak: (hasGasLeak: boolean) => void;
} & Ubidots;

const defaultState = {
  isConnected: false,
  lastActive: null,
  hasGasLeak: false,
  latestData: {
    temperature: 0,
    humidity: 0,
    gas: 0,
    flame: 0
  }
};

export const useUbidotsStore = create<UbidotsStore>()(set => ({
  ...defaultState,
  setHasGasLeak: (hasGasLeak: boolean) => set(state => ({ ...state, hasGasLeak })),
  setLastActive: (lastActive: number) => set(state => ({ ...state, lastActive })),
  setIsConnected: (isConnected: boolean) => set(state => ({ ...state, isConnected })),
  setLatestData: (latestData: Partial<Ubidots["latestData"]>) =>
    set(state => ({ ...state, latestData: { ...state.latestData, ...latestData } }))
}));
