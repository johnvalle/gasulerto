import { NOTIFEE } from "@core/constants/notifee";

import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native";

export const notifeeNotifications = (() => {
  const init = async () => {
    // Adding empty listener to remove warning
    notifee.onBackgroundEvent(async () => {});

    await notifee.createChannel({
      id: NOTIFEE.CHANNEL.ALERTS,
      name: "Alerts",
      bypassDnd: true,
      sound: "buzzer",
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC
    });

    await notifee.createChannel({
      id: NOTIFEE.CHANNEL.WARNINGS,
      name: "Warnings",
      bypassDnd: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC
    });
  };

  const displayAlertNotifications = async (notification: Record<"title" | "message", string>) => {
    await notifee.displayNotification({
      title: notification.title,
      body: notification.message,
      android: {
        lightUpScreen: true,
        loopSound: true,
        sound: "buzzer",
        channelId: NOTIFEE.CHANNEL.ALERTS,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: {
          id: NOTIFEE.PRESS_ACTION.ALERT,
          launchActivity: "default"
        }
      }
    });
  };

  const displayWarningNotification = async (notification: Record<"title" | "message", string>) => {
    await notifee.displayNotification({
      title: notification.title,
      body: notification.message,
      android: {
        channelId: NOTIFEE.CHANNEL.WARNINGS,
        importance: AndroidImportance.DEFAULT,
        visibility: AndroidVisibility.PUBLIC,
        lightUpScreen: true,
        pressAction: {
          id: NOTIFEE.PRESS_ACTION.WARNING,
          launchActivity: "default"
        }
      }
    });
  };

  return {
    init,
    displayAlertNotifications,
    displayWarningNotification
  };
})();
