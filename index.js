import Pushy from "pushy-react-native";
import { AppRegistry, LogBox, Text, TextInput } from "react-native";
import Sound from "react-native-sound";

import messaging from "@react-native-firebase/messaging";

import App from "./App";
import { name as appName } from "./app.json";
import { useBuzzerSoundStore } from "./src/hooks/useBuzzerSoundStore";
import * as RootNavigation from "./src/navigation/RootNavigation";
import { notifeeNotifications } from "./src/utils/notifee";

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

AppRegistry.registerComponent(appName, () => App);

Sound.setCategory("Playback");

const buzzerSound = new Sound("buzzer.mp3", Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log("Failed to create sound instance: ", err);
  }
  buzzerSound.setNumberOfLoops(-1);
  buzzerSound.setVolume(1.0);
  useBuzzerSoundStore.getState().setSound(buzzerSound);
});

// Setup notification channels
notifeeNotifications.init();

// Register foreground notification handler
messaging().onMessage(async remoteMessage => {
  const notification = JSON.parse(remoteMessage.data._pushyPayload);
  if (notification.type === "danger") {
    RootNavigation.navigate("Alarm", { message: notification.message });
  }
});

// Register background notification handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  const notification = JSON.parse(remoteMessage.data._pushyPayload);

  if (notification.type === "danger") {
    notifeeNotifications.displayAlertNotifications(notification);
  } else {
    notifeeNotifications.displayWarningNotification(notification);
  }
});
