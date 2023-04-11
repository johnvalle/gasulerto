import { AppScreen, RouteParam } from "@core/types/navigation";

export const getTabIconOptions = ({ route, color }: { route: RouteParam; color: string }) => {
  const routeName = route.route.name;
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
