import { create } from "zustand";

import { Nullable } from "@coreTypes/generics/nullable";

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

const useUserStore = create<UserStore>(set => ({
  ...defaultState,
  setUser: (user: User) => set(user),
  logOut: () => set(defaultState, true)
}));

export default useUserStore;
