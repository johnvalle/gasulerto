import { AppScreen } from "@core/types/navigation";

import Dashboard from "./Dashboard.screen";

const navigation = {
  name: AppScreen.Dashboard,
  component: Dashboard,
  options: {
    headerShown: false
  }
} as const;

export default navigation;
