import { ParamListBase, RouteProp } from "@react-navigation/native";

import { authenticatedRoutes } from "@core/navigation/AuthenticatedStack";

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
  const tabs = { ...authenticatedRoutes };
  type TabNames = (typeof tabs)[number]["name"];

  const routeName = route.route.name as TabNames;
  let name = "";

  if (routeName === "Dashboard") {
    name = "home-variant";
  }

  if (routeName === "Notifications") {
    name = "bell";
  }

  if (routeName === "Settings") {
    name = "cog";
  }

  return {
    name,
    color
  };
};
