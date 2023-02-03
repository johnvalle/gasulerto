import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginRoutes from "@core/features/Login/Login.navigation";
import Login from "@core/features/Login/Login.screen";
import { AppScreen } from "@core/types/navigation";

type UnauthenticatedStackList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<UnauthenticatedStackList>();

export const unauthenticatedRoutes = [LoginRoutes];
export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppScreen.Login} component={Login} />
    </Stack.Navigator>
  );
}
