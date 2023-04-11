import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AppScreen {
  Dashboard = "Dashboard",
  Notifications = "Notifications",
  Settings = "Settings",
  Alarm = "Alarm",
  Login = "Login",
  Home = "Home"
}

export type RootStackParamList = { [T in AppScreen]: undefined };
export type ScreenProps<T extends AppScreen> = NativeStackScreenProps<RootStackParamList, T>;
export type RouteParam = {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
};
