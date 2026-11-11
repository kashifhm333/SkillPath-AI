import { db } from "../../database/db.js";

export class NotificationsService {
  public async getNotifications(userId?: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    const list = dataStore.notifications.filter((n) => n.userId === uid || n.userId === "usr_alex_morgan");
    const unreadCount = list.filter((n) => n.unread).length;

    return {
      unreadCount,
      notifications: list,
    };
  }

  public async markAllRead(userId?: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    dataStore.notifications.forEach((n) => {
      if (n.userId === uid || n.userId === "usr_alex_morgan") {
        n.unread = false;
      }
    });

    await db.persist();
    return { success: true, message: "All notifications marked as read" };
  }

  public async markOneRead(id: string) {
    const dataStore = db.getData();
    const notification = dataStore.notifications.find((n) => n.id === id);
    if (notification) {
      notification.unread = false;
      await db.persist();
    }
    return { success: true };
  }
}

export const notificationsService = new NotificationsService();
