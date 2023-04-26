import { useEffect } from "react";

import messaging from "@react-native-firebase/messaging";

import { FIREBASE } from "@core/constants/firebase";
import { THRESHOLD } from "@core/constants/sensor";

import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native";

import { useUserStore } from "./useUserStore";

export const useFCM = () => {
  const threshold = useUserStore(state => state.threshold);

  const removePreviousSubscriptions = async () => {
    THRESHOLD.GAS_LIST.forEach(value =>
      messaging()
        .unsubscribeFromTopic(value.toString())
        .then(() => console.log(`Unsubscribed from ${value}`))
    );
  };

  useEffect(() => {
    (async () => {
      if (!threshold) return;
      removePreviousSubscriptions().then(() => {
        messaging()
          .subscribeToTopic(threshold.toString())
          .then(async () => {
            await notifee.createChannel({
              id: FIREBASE.CLOUD_MESSAGING.ALERT_CHANNEL,
              name: "Alerts",
              sound: "buzzer",
              bypassDnd: true,
              badge: true,
              importance: AndroidImportance.HIGH,
              visibility: AndroidVisibility.PUBLIC
            });

            await notifee.createChannel({
              id: FIREBASE.CLOUD_MESSAGING.WARNING_CHANNEL,
              name: "Warnings",
              sound: "default",
              badge: true,
              importance: AndroidImportance.DEFAULT,
              visibility: AndroidVisibility.PUBLIC
            });

            console.log(`FCM Subscribed to ${threshold}`);
          })
          .catch(err => {
            console.log("Failed to subscribe: ", err);
          });
      });
    })();
  }, [threshold]);

  return {
    removePreviousSubscriptions
  };
};
