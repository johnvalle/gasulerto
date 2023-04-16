import { useCallback, useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { FIREBASE } from "@core/constants/firebase";
import { THRESHOLD } from "@core/constants/sensor";
import { useUserStore } from "@core/hooks";
import { Nullable } from "@coreTypes/generics/nullable";

import { useNotifications } from "./useNotifications";

export type UserSettings = {
  threshold: number;
  primaryContact: {
    name: string;
    number: string;
  };
};

export const useUserSettings = () => {
  const [isRetrieved, setIsRetrieved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userSettings, setUserSettings] = useState<Nullable<UserSettings>>(null);
  const { userId, threshold, setUser } = useUserStore();
  const { sendInfoNotifications } = useNotifications();

  const settings = firestore().collection(FIREBASE.FIRESTORE.SETTINGS);

  const getSettings = useCallback(async () => {
    try {
      if (!userId) {
        return;
      }
      setIsLoading(true);
      const user = await settings.doc(userId).get();
      const data = user.data() as Nullable<UserSettings>;

      setUserSettings(data);
      setUser({ threshold: data?.threshold });
    } catch (error) {
      console.error("Failed to retrieve user settings", error);
    } finally {
      setIsLoading(false);
      setIsRetrieved(true);
    }
  }, [userId, settings]);

  const initializeUserSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!userId) {
        return;
      }
      await settings
        .doc(userId)
        .set({ threshold: THRESHOLD.GAS, primaryContact: { name: "911 Services", number: "911" } });
      setUser({ threshold: THRESHOLD.GAS });
    } catch (error) {
      console.error("Failed to initialize user settings", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, settings, isRetrieved]);

  const updateUserSettings = async (data: UserSettings) => {
    try {
      setIsLoading(true);
      if (!userId) {
        return;
      }
      sendInfoNotifications();
      settings.doc(userId).set({ threshold: data.threshold, primaryContact: data.primaryContact });
    } catch (error) {
      console.error("Failed to update threshold", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      const unsubscribe = settings.doc(userId).onSnapshot(getSettings);
      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (isRetrieved && !threshold) {
      initializeUserSettings();
    }
  }, [isRetrieved, threshold]);

  return {
    getSettings,
    initializeUserSettings,
    updateUserSettings,
    userSettings,
    isLoading
  };
};
