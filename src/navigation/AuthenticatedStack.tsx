import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import theme from "@core/constants/theme";
import DashboardRoutes from "@core/features/Dashboard/Dashboard.navigation";
import NotificationRoutes from "@core/features/Notifications/Notification.navigation";
import SettingsRoutes from "@core/features/Settings/Settings.navigation";
import { getTabIconOptions } from "@core/utils/getTabIconOptions";

export const authenticatedRoutes = [DashboardRoutes, NotificationRoutes, SettingsRoutes];
const Tab = createBottomTabNavigator();

export default function AuthenticatedStack() {
  const renderIcon = (props: Parameters<typeof getTabIconOptions>[number]) => {
    return <Icon size={24} {...getTabIconOptions({ ...props })} />;
  };
  const routes = authenticatedRoutes.map(({ name, component, options }) => (
    <Tab.Screen key={name} children={component} name={name} options={options} />
  ));

  return (
    <Tab.Navigator
      screenOptions={route => ({
        tabBarIcon: ({ color }) => renderIcon({ route, color }),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grayLight,
        tabBarShowLabel: false
      })}>
      {routes}
    </Tab.Navigator>
  );
}
