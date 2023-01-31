import { AppScreen } from "@core/types/navigation";

import { Login } from "./Login.screen";

export default {
  name: AppScreen.Login,
  component: Login,
  options: {
    headerShown: false
  }
} as const;
