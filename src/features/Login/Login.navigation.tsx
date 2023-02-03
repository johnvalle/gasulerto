import { AppScreen } from "@core/types/navigation";

import Login from "./Login.screen";

const navigation = {
  name: AppScreen.Login,
  navigation: <Login />,
  options: {
    headerShown: false
  }
} as const;

export default navigation;
