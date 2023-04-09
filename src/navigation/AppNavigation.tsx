import dayjs from "dayjs";
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { Loader } from "@core/components";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useAuth, useUserStore } from "@core/hooks";
import { usePushy } from "@core/hooks/usePushy";
import { useUbidotsMqtt } from "@core/hooks/useUbidotsMqtt";
import { UserStore } from "@core/hooks/useUserStore";

import AuthenticatedStack from "./AuthenticatedStack";
import { navigationRef } from "./RootNavigation";
import UnauthenticatedStack from "./UnauthenticatedStack";

export const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Subscribe to Ubidots MQTT
  useUbidotsMqtt();

  // Subscribe to push notifications using Pushy
  usePushy();

  return (
    <>
      {isLoading ? <Loader /> : null}
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <NavigationContainer ref={navigationRef}>
          {isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
      </LoadingContext.Provider>
    </>
  );
};
