import { AppScreen } from "@core/types/navigation";

import Notifications from "./Notification.screen";

export default {
  name: AppScreen.Notifications,
  component: Notifications,
  options: {
    headerShown: false,
    tabBarShowLabel: false
  }
} as const;
