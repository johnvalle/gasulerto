import { AppScreen } from "@core/types/navigation";

import Settings from "./Settings.screen";

const navigation = {
  name: AppScreen.Settings,
  component: Settings,
  options: {
    headerShown: false,
    cardStyle: {
      backgroundColor: "#000000"
    }
  }
} as const;

export default navigation;
