import { NOTIFEE } from "@core/constants/notifee";

import notifee, { AndroidColor, AndroidImportance, AndroidVisibility } from "@notifee/react-native";

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
      sound: "default",
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
        smallIcon: "ic_notification",
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
        lightUpScreen: true,
        sound: "default",
        smallIcon: "ic_notification",
        channelId: NOTIFEE.CHANNEL.WARNINGS,
        importance: AndroidImportance.DEFAULT,
        visibility: AndroidVisibility.PUBLIC,
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
