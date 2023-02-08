import dayjs from "dayjs";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { Loader } from "@core/components";
import { useAuth, useLoading, useUserStore } from "@core/hooks";
import { UserStore } from "@core/hooks/useUserStore";

import AuthenticatedStack from "./AuthenticatedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

export const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { isLoading, setIsLoading } = useLoading(true);

  const { signOut } = useAuth();

  const watchTokenExpiration = (state: UserStore) => {
    const isExpired = !state.token || dayjs().isAfter(dayjs(state.expiresOn));
    setIsLoggedIn(!isExpired);

    if (isExpired && !!state.token) {
      signOut();
    }
  };

  // watch hydration on initial app load
  const unsubcribe = useUserStore.persist.onFinishHydration(state => {
    watchTokenExpiration(state);

    setIsLoading(false);
    return unsubcribe();
  });

  // listen to state changes everytime logging in or signing out
  useUserStore.subscribe(watchTokenExpiration);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <NavigationContainer>{isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}</NavigationContainer>
    </>
  );
};
