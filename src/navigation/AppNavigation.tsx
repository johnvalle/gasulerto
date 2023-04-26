import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { Loader } from "@core/components";
import { LoadingContext } from "@core/contexts/LoadingContext";
import { useAuth, useUserSettings, useUserStore } from "@core/hooks";
import { useFCM } from "@core/hooks/useFCM";
import { useUbidotsMqtt } from "@core/hooks/useUbidotsMqtt";
import { UserStore } from "@core/hooks/useUserStore";
import { AppScreen } from "@core/types/navigation";

import notifee from "@notifee/react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import AuthenticatedStack from "./AuthenticatedStack";
import { navigationRef } from "./RootNavigation";
import * as RootNavigation from "./RootNavigation";
import UnauthenticatedStack from "./UnauthenticatedStack";

dayjs.extend(relativeTime);

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

  // Subscribe to push notifications using FCM
  useFCM();

  // Listen to internet connection
  const { isConnected, isInternetReachable } = useNetInfo();

  useEffect(() => {
    const isNotReachable = typeof isInternetReachable === "boolean" && !isInternetReachable;
    const isDisconnected = typeof isConnected === "boolean" && !isConnected;
    if (isNotReachable && isDisconnected) {
      Alert.alert("Connection lost", "Please connect to an stable internet connection to continue using the app.");
    }
  }, [isConnected, isInternetReachable]);

  useEffect(() => {
    (async () => {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        const { pressAction, notification } = initialNotification;
        if (pressAction && pressAction.id === "gasulerto-danger-click") {
          RootNavigation.navigate(AppScreen.Alarm, { message: notification.body });
        }
      }

      const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
      if (batteryOptimizationEnabled) {
        // 2. ask your users to disable the feature
        Alert.alert(
          "Restrictions Detected",
          "To ensure notifications are delivered, please disable battery optimization for the app and make sure app never goes to sleep.",
          [
            // 3. launch intent to navigate the user to the appropriate screen
            {
              text: "OK, open settings",
              onPress: async () => await notifee.openBatteryOptimizationSettings()
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    })();
  }, []);

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
