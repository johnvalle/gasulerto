import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Nullable } from "@coreTypes/generics/nullable";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_NAME } from "./../constants/storage";

type User = {
  name: Nullable<string>;
  expiresOn: Nullable<number>;
  token: Nullable<string>;
  userId: Nullable<string>;
  isAnonymous: boolean;
  threshold: Nullable<number>;
};

export type UserStore = {
  setUser: (user: Partial<User>) => void;
  logOut: () => void;
} & User;

const defaultState = { name: null, expiresOn: null, userId: null, threshold: null, token: null, isAnonymous: false };

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...defaultState,
      setUser: (user: Partial<User>) => set(state => ({ ...state, ...user })),
      logOut: () => {
        set({
          name: null,
          expiresOn: null,
          token: null,
          userId: null,
          isAnonymous: false,
          threshold: null
        });
      }
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
