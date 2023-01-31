import { ParamListBase, RouteProp } from "@react-navigation/native";

import { authenticatedTabRoutes } from "@core/navigation/AuthenticatedStack";
import { AppScreen } from "@core/types/navigation";

export const getTabIconOptions = ({
  route,
  color
}: {
  route: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  };
  color: string;
}) => {
  const tabs = { ...authenticatedTabRoutes };
  type TabNames = (typeof tabs)[number]["name"];

  const routeName = route.route.name as TabNames;
  let name = "";

  if (routeName === AppScreen.Dashboard) {
    name = "home-variant";
  }

  if (routeName === AppScreen.Notifications) {
    name = "bell";
  }

  if (routeName === AppScreen.Settings) {
    name = "cog";
  }

  return {
    name,
    color
  };
};
