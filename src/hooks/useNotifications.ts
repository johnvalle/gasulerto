import { useEffect, useMemo, useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { FIREBASE } from "@core/constants/firebase";
import { FirebaseNotificationHistoryItem, Notification } from "@core/types/notification";

import { useUserStore } from "./useUserStore";

export const useNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>();
  const { userId } = useUserStore();

  const userNotifications = firestore().collection(FIREBASE.FIRESTORE.NOTIFICATIONS);
  const hasNotifications = !!notifications && !!notifications.length;
  const notificationsOrderByTime =
    !!notifications && !!notifications.length ? notifications?.sort((a, b) => b.timestamp - a.timestamp) : [];

  const unreadNotificationsCount = useMemo(() => {
    return notifications?.filter(({ read }) => !read).length;
  }, [notifications]);

  const getNotificationsHistory = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const snapshot = await userNotifications.doc(userId).get();
      return snapshot.data() as FirebaseNotificationHistoryItem;
    } catch (error) {
      console.error("Failed to retrieve notifications", error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeNotifications = async () => {
    const data = await getNotificationsHistory();
    // data.notifications can be null or empty
    const notificationsHistory = data?.notifications ?? [];
    setNotifications(notificationsHistory);
  };

  const markAllAsRead = async () => {
    if (!userId) return;
    try {
      // retrieve current list of notifications
      const snapshot = await userNotifications.doc(userId).get();
      const firestoreData = snapshot.data();
      // update each notifications property read to true
      const readNotifications = firestoreData?.notifications.map(({ ...rest }) => ({ ...rest, read: true }));
      setNotifications(readNotifications);
      // update firestore
      return userNotifications.doc(userId).set({ notifications: readNotifications });
    } catch (error) {
      console.error("Failed to update notifications as read");
    }
  };

  const sendInfoNotifications = async () => {
    if (!userId) return;
    try {
      // retrieve current list of notifications
      const snapshot = await userNotifications.doc(userId).get();
      const prevNotifs = snapshot.data()?.notifications ?? [];
      const newNotifs = [
        ...prevNotifs,
        {
          timestamp: Date.now(),
          title: "Update",
          description: "Settings updated successfully",
          type: "info",
          read: false
        }
      ];
      setNotifications(newNotifs);
      return userNotifications.doc(userId).set({ notifications: newNotifs });
    } catch (error) {
      console.error("Failed to send info notifications");
    }
  };

  useEffect(() => {
    if (userId) {
      const unsubscribe = userNotifications.doc(userId).onSnapshot(initializeNotifications);

      return () => unsubscribe();
    }
  }, [userId]);

  return {
    isLoading,
    notificationsOrderByTime,
    hasNotifications,
    unreadNotificationsCount,
    sendInfoNotifications,
    initializeNotifications,
    markAllAsRead
  };
};
