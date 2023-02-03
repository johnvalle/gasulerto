import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import theme from "@core/constants/theme";
import Alarm from "@core/features/Alarm/Alarm.screen";
import DashboardRoutes from "@core/features/Dashboard/Dashboard.navigation";
import NotificationRoutes from "@core/features/Notifications/Notification.navigation";
import Notifications from "@core/features/Notifications/Notification.screen";
import SettingsRoutes from "@core/features/Settings/Settings.navigation";
import { AppScreen } from "@core/types/navigation";
import { getTabIconOptions } from "@core/utils/getTabIconOptions";

export const authenticatedTabRoutes = [DashboardRoutes, NotificationRoutes, SettingsRoutes];

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderIcon = (props: Parameters<typeof getTabIconOptions>[number]) => {
  return <Icon size={24} {...getTabIconOptions({ ...props })} />;
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={route => ({
        headerShown: false,
        tabBarIcon: ({ color }) => renderIcon({ route, color }),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grayLight,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: theme.spacing.lg,
          borderTopWidth: 0,
          elevation: 2
        }
      })}
      tabBar={props => (
        <View
          style={{
            margin: theme.spacing.sm,
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0
          }}>
          <BottomTabBar {...props} />
        </View>
      )}>
      <Tab.Screen name={AppScreen.Notifications} component={Notifications} />
    </Tab.Navigator>
  );
};

export default function AuthenticatedStack() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={HomeTabs} />
      <AuthStack.Screen name="Alarm" component={Alarm} />
    </AuthStack.Navigator>
  );
}
