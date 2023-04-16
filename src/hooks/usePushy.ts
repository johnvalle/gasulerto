import Pushy from "pushy-react-native";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";

import { THRESHOLD } from "@core/constants/sensor";

import { useUserStore } from "./useUserStore";

export const usePushy = () => {
  const threshold = useUserStore(state => state.threshold);

  const removePreviousSubscriptions = async () => {
    const isRegistered = await Pushy.isRegistered();
    if (!isRegistered) {
      return;
    }

    THRESHOLD.GAS_LIST.forEach(value => Pushy.unsubscribe(value.toString()));
  };

  useEffect(() => {
    (async () => {
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
          removePreviousSubscriptions()
            .then(() => {
              Pushy.subscribe(threshold.toString())
                .then(() => {
                  console.log(`Pushy subscribed to ${threshold}`);
                })
                .catch(err => console.log("Failed to subscribe", err));
            })
            .catch(err => console.log("Failed to unsubscribe", err));
        }
      }
    })();
  }, [threshold]);
};
