export enum NotificationType {
  INFO = "info",
  DANGER = "danger",
  WARNING = "warning"
}

export type Notification = {
  title: string;
  description: string;
  timestamp: number;
  type: NotificationType;
  read: boolean;
};

export type FirebaseNotificationHistoryItem = Record<"notifications", Notification[]>;
