import Pushy from "pushy-react-native";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

import { useUserStore } from "./useUserStore";

export const usePushy = () => {
  const threshold = useUserStore(state => state.threshold);

  const listenNotifications = useCallback(async () => {
    if (!threshold) return;
    Pushy.listen();
    Pushy.setNotificationIcon("ic_notification");
    if (Platform.OS === "android") {
      Pushy.toggleFCM(true);
    }

    const deviceToken = await Pushy.register();
    if (!!deviceToken) {
      const isRegistered = await Pushy.isRegistered();
      if (isRegistered) {
        Pushy.subscribe(threshold.toString())
          .then(() => {
            console.log(`Pushy subsribed to ${threshold}`);
          })
          .catch(err => {
            throw Error(err);
          });
      }
    }
  }, [threshold]);

  useEffect(() => {
    listenNotifications();
  }, [threshold, listenNotifications]);
};
