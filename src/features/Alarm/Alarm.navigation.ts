import { AppScreen } from "@core/types/navigation";

import Alarm from "./Alarm.screen";

export default {
  name: AppScreen.Alarm,
  component: Alarm,
  options: {
    headerShown: false
  }
} as const;
