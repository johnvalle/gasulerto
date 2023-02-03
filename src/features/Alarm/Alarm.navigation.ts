import { AppScreen } from "@core/types/navigation";

import Alarm from "./Alarm.screen";

const navigation = {
  name: AppScreen.Alarm,
  component: Alarm,
  options: {
    headerShown: false
  }
} as const;

export default navigation;
