import Pushy from "pushy-react-native";
import { AppRegistry, LogBox, Text, TextInput, Vibration } from "react-native";
import Sound from "react-native-sound";

import App from "./App";
import { name as appName } from "./app.json";
import { useBuzzerSoundStore } from "./src/hooks/useBuzzerSoundStore";
import { useUserStore } from "./src/hooks/useUserStore";
import * as RootNavigation from "./src/navigation/RootNavigation";

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

Pushy.setNotificationListener(async data => {
  const notificationTitle = data.title;
  const notificationText = data.message;
  const notificationType = data.type;

  if (!!useUserStore.getState().token) {
    Pushy.notify(notificationTitle, notificationText, data);

    if (notificationType === "danger") {
      RootNavigation.navigate("Alarm");
      Vibration.vibrate([200, 200, 200], true);
    }
  }
});
