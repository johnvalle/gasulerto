import { AppScreen } from "@core/types/navigation";

import Dashboard from "./Dashboard.screen";

export default {
  name: AppScreen.Dashboard,
  component: Dashboard,
  options: {
    headerShown: false
  }
} as const;
