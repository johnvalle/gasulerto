import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginRoutes from "@core/features/Login/Login.navigation";

type UnauthenticatedStackList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<UnauthenticatedStackList>();

export const unauthenticatedRoutes = [LoginRoutes];
export default function UnauthenticatedStack() {
  const routes = unauthenticatedRoutes.map(options => <Stack.Screen key={options.name} {...options} />);
  return <Stack.Navigator>{routes}</Stack.Navigator>;
}
