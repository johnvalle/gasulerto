import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@core/features/Login/Login.screen";
import { AppScreen } from "@core/types/navigation";

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppScreen.Login} component={Login} />
    </Stack.Navigator>
  );
}
