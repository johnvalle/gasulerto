import React from "react";

import firestore from "@react-native-firebase/firestore";

import { FIREBASE } from "@core/constants/firebase";
import { useUserStore } from "@core/hooks";
import { Nullable } from "@coreTypes/generics/nullable";

export type UserSettings = {
  threshold: number;
  primaryContact: {
    name: string;
    number: string;
  };
};

export const useUserSettings = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userSettings, setUserSettings] = React.useState<Nullable<UserSettings>>(null);
  const { userId } = useUserStore();

  const settings = firestore().collection(FIREBASE.FIRESTORE.SETTINGS);
  const id = userId as string;

  const getSettings = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const user = await settings.doc(id).get();
      const data = user.data() as Nullable<UserSettings>;

      setIsLoading(false);
      setUserSettings(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to retrieve user settings", error);
    }
  }, [id, settings]);

  const initializeUserSettings = React.useCallback(async () => {
    try {
      setIsLoading(true);
      if (!id) {
        return;
      }
      await settings.doc(id).set({ threshold: 300, primaryContact: { name: "911 Services", number: "911" } });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to initialize user settings", error);
    }
  }, [id, settings]);

  const updateUserSettings = async (data: UserSettings) => {
    try {
      setIsLoading(true);
      if (!id) {
        return;
      }
      await settings.doc(id).set({ threshold: data.threshold, primaryContact: data.primaryContact });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update threshold", error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = settings.doc(id).onSnapshot(getSettings);

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!isLoading && !userSettings) {
      initializeUserSettings();
    }
  }, [isLoading, userSettings, initializeUserSettings]);

  return {
    updateUserSettings,
    userSettings,
    isLoading
  };
};
