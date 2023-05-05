import { useEffect } from "react";
import { AppState } from "react-native";

import { NOTIFEE } from "@core/constants/notifee";
import * as RootNavigation from "@core/navigation/RootNavigation";
import { AppScreen } from "@core/types/navigation";

import notifee from "@notifee/react-native";

export const useNotificationClickListener = () => {
  async function setupListener() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification && initialNotification.pressAction?.id === NOTIFEE.PRESS_ACTION.ALERT) {
      RootNavigation.navigate(AppScreen.Alarm, { message: initialNotification.notification.body });
    }
  }

  useEffect(() => {
    const subscriber = AppState.addEventListener("change", setupListener);
    return () => subscriber.remove();
  }, []);
};
