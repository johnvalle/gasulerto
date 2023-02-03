import { AppScreen } from "@core/types/navigation";

import Notifications from "./Notification.screen";

const navigation = {
  name: AppScreen.Notifications,
  component: Notifications,
  options: {
    headerShown: false,
    tabBarShowLabel: false
  }
} as const;

export default navigation;
