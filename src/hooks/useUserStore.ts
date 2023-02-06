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
};

type UserStore = {
  setUser: (user: User) => void;
  logOut: () => void;
} & User;

const defaultState = { name: null, expiresOn: null, userId: null, token: null, isAnonymous: false };

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...defaultState,
      setUser: (user: User) => set(user),
      logOut: () => set(defaultState, true)
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useUserStore;
