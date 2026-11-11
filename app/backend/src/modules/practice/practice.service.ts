import { db } from "../../database/db.js";
import { NotFoundError } from "../../common/errors.js";

export class PracticeService {
  public async getPracticeItems(userId?: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    const items = dataStore.practiceItems.filter((item) => item.userId === uid || item.userId === "usr_alex_morgan");
    const dueCount = items.filter((i) => i.dueToday).length;

    return {
      dueCount,
      estimatedTimeMinutes: dueCount * 4,
      items,
    };
  }

  public async reviewItem(itemId: string) {
    const dataStore = db.getData();
    const item = dataStore.practiceItems.find((i) => i.id === itemId);
    if (!item) throw new NotFoundError("Practice item not found");

    // Increase memory strength through spaced repetition
    item.memoryStrength = Math.min(100, item.memoryStrength + 15);
    item.status = item.memoryStrength >= 85 ? "Mastered" : "Strengthening";
    item.lastReviewed = new Date().toISOString();
    item.dueToday = false;

    await db.persist();

    return item;
  }

  public async startSmartSession(userId?: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    const items = dataStore.practiceItems.filter((i) => i.userId === uid || i.userId === "usr_alex_morgan");

    // Recalibrate items
    items.forEach((i) => {
      if (i.memoryStrength < 75) {
        i.dueToday = true;
      }
    });

    await db.persist();

    return {
      message: "Smart review session initiated with priority retention algorithms.",
      activeReviewItems: items.filter((i) => i.dueToday),
    };
  }
}

export const practiceService = new PracticeService();
