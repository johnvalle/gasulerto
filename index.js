import Pushy from "pushy-react-native";
import { AppRegistry, LogBox, Text, TextInput } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";
import { useUserStore } from "./src/hooks/useUserStore";
import * as RootNavigation from "./src/navigation/RootNavigation";

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

LogBox.ignoreLogs(["new NativeEventEmitter", "Require cycle: node_modules/victory"]);

AppRegistry.registerComponent(appName, () => App);

Pushy.setNotificationListener(async data => {
  console.log("Received notification: " + JSON.stringify(data));

  const notificationTitle = data.title;
  const notificationText = data.message;

  // Android: Displays a system notification
  // iOS: Displays an alert dialog
  RootNavigation.navigate("Alarm");
  Pushy.notify(notificationTitle, notificationText, data);
});
