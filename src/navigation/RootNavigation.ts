import { createNavigationContainerRef } from "@react-navigation/native";

import { AppScreen, RootStackParamList } from "@core/types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: AppScreen) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
