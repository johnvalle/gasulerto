import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { Loader } from "@core/components";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useAuth, useUserSettings, useUserStore } from "@core/hooks";
import { useNotificationClickListener } from "@core/hooks/useNotificationClickListener";
import { useUbidotsMqtt } from "@core/hooks/useUbidotsMqtt";
import { UserStore } from "@core/hooks/useUserStore";

import { useNetInfo } from "@react-native-community/netinfo";

import AuthenticatedStack from "./AuthenticatedStack";
import { navigationRef } from "./RootNavigation";
import UnauthenticatedStack from "./UnauthenticatedStack";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

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
  useUserStore.persist.onFinishHydration(state => {
    watchTokenExpiration(state);
    setIsLoading(false);
  });

  useUserSettings();

  // listen to state changes everytime logging in or signing out
  useUserStore.subscribe(watchTokenExpiration);

  // Subscribe to Ubidots MQTT
  useUbidotsMqtt();

  useNotificationClickListener();

  // Listen to internet connection
  const { isConnected, isInternetReachable } = useNetInfo();

  useEffect(() => {
    const isNotReachable = typeof isInternetReachable === "boolean" && !isInternetReachable;
    const isDisconnected = typeof isConnected === "boolean" && !isConnected;
    if (isNotReachable && isDisconnected) {
      Alert.alert("Connection lost", "Please connect to an stable internet connection to continue using the app.");
    }
  }, [isConnected, isInternetReachable]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <NavigationContainer ref={navigationRef}>
          {isLoggedIn && isConnected ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
      </LoadingContext.Provider>
    </>
  );
};
