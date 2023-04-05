import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { BottomTabBar, BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import theme from "@core/constants/theme";
import { Alarm } from "@core/features/Alarm/";
import { Dashboard } from "@core/features/Dashboard";
import { Notifications } from "@core/features/Notifications";
import { Settings } from "@core/features/Settings/";
import { AppScreen, RootStackParamList } from "@core/types/navigation";
import { getTabIconOptions } from "@core/utils/getTabIconOptions";

import { Box } from "@components";

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const renderIcon = (props: Parameters<typeof getTabIconOptions>[number]) => {
  return <Icon size={24} {...getTabIconOptions({ ...props })} />;
};

const CustomTabBar = (props: BottomTabBarProps) => (
  <Box margin="sm" position="absolute" left={0} bottom={0} right={0}>
    <BottomTabBar {...props} />
  </Box>
);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppScreen.Dashboard}
      screenOptions={route => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
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
      tabBar={CustomTabBar}>
      <Tab.Screen name={AppScreen.Dashboard} component={Dashboard} />
      <Tab.Screen name={AppScreen.Notifications} component={Notifications} />
      <Tab.Screen name={AppScreen.Settings} component={Settings} />
    </Tab.Navigator>
  );
};

export default function AuthenticatedStack() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={AppScreen.Home} component={HomeTabs} />
      <AuthStack.Screen name={AppScreen.Alarm} component={Alarm} options={{ presentation: "fullScreenModal" }} />
    </AuthStack.Navigator>
  );
}
