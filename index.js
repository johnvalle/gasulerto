import { AppRegistry, LogBox, Text, TextInput } from "react-native";
import { PermissionsAndroid } from "react-native";
import Sound from "react-native-sound";

import messaging from "@react-native-firebase/messaging";

import notifee, { AndroidCategory, AndroidImportance, AndroidVisibility, EventType } from "@notifee/react-native";

import App from "./App";
import { name as appName } from "./app.json";
import { FIREBASE } from "./src/constants/firebase";
import * as RootNavigation from "./src/navigation/RootNavigation";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

AppRegistry.registerComponent("alarm-screen", () => Alarm);
LogBox.ignoreLogs(["new NativeEventEmitter"]);
// Disable font scaling and maintain true app font size
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

notifee.onBackgroundEvent(async event => {
  console.log({ NotifeeBackground: event });
  if (
    (event.type === EventType.PRESS && event.detail.pressAction.id === "gasulerto-danger-click") ||
    event.detail.notification.data.type === "danger"
  ) {
    RootNavigation.navigate("Alarm", { message: event.detail.notification.body });
  }
});

messaging().onMessage(async remoteMessage => {
  if (remoteMessage.data.type === "danger") {
    RootNavigation.navigate("Alarm", { message: remoteMessage.data.body });
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", { remoteMessage });
  if (remoteMessage.data.type === "danger") {
    await notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
      android: {
        channelId: FIREBASE.CLOUD_MESSAGING.ALERT_CHANNEL,
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        sound: "buzzer",
        loopSound: true,
        visibility: AndroidVisibility.PUBLIC,
        lightUpScreen: true,
        pressAction: {
          id: FIREBASE.CLOUD_MESSAGING.ALERT_CLICK,
          launchActivity: "default"
        }
      }
    });
  } else {
    await notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
      android: {
        channelId: FIREBASE.CLOUD_MESSAGING.WARNING_CHANNEL,
        sound: "default",
        importance: AndroidImportance.DEFAULT,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: {
          id: FIREBASE.CLOUD_MESSAGING.WARNING_CLICK,
          launchActivity: "default"
        }
      }
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
