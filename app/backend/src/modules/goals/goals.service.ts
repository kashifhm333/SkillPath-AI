import { db } from "../../database/db.js";
import { NotFoundError } from "../../common/errors.js";

export class GoalsService {
  public async getGoals(userId?: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    const profile = dataStore.profiles.find((p) => p.userId === uid) || dataStore.profiles[0];
    const milestones = dataStore.milestones.filter((m) => m.userId === uid || m.userId === "usr_alex_morgan");

    return {
      primaryGoal: profile.goal || "Become an AI Engineer",
      targetDate: "October 2026",
      weeklyHours: profile.hours || 8,
      overallProgress: profile.roleReadinessPercent || 24,
      milestones,
    };
  }

  public async createMilestone(userId: string | undefined, title: string, targetDate: string) {
    const dataStore = db.getData();
    const uid = userId || "usr_alex_morgan";
    const newMilestone = {
      id: `ms_${Date.now()}`,
      userId: uid,
      targetDate,
      title,
      progress: 0,
      status: "Upcoming",
    };

    dataStore.milestones.push(newMilestone);
    await db.persist();

    return newMilestone;
  }

  public async updateMilestone(id: string, patch: { progress?: number; status?: string }) {
    const dataStore = db.getData();
    const milestone = dataStore.milestones.find((m) => m.id === id);
    if (!milestone) throw new NotFoundError("Milestone not found");

    if (patch.progress !== undefined) milestone.progress = patch.progress;
    if (patch.status !== undefined) milestone.status = patch.status;

    await db.persist();
    return milestone;
  }
}

export const goalsService = new GoalsService();
