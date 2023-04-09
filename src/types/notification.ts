export type NotificationType = "danger" | "warning" | "info";

export type Notification = {
  title: string;
  description: string;
  timestamp: number;
  type: NotificationType;
  read: boolean;
};

export type FirebaseNotificationHistoryItem = Record<"notifications", Notification[]>;
