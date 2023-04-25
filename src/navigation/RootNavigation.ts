import { createNavigationContainerRef } from "@react-navigation/native";

import { AppScreen, RootStackParamList } from "@core/types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: AppScreen, params: RootStackParamList[keyof RootStackParamList]) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name, params });
  }
}
