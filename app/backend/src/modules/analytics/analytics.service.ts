import { db } from "../../database/db.js";

export class AnalyticsService {
  public async getAnalytics(userId?: string) {
    const dataStore = db.getData();
    const profile = dataStore.profiles.find((p) => p.userId === (userId || "usr_alex_morgan")) || dataStore.profiles[0];

    const weeklyActivity = [42, 60, 38, 76, 55, 88, 70, 92, 66, 84, 78, 96];

    const competencies = [
      { name: "Python programming", value: 86 },
      { name: "Data & SQL", value: 68 },
      { name: "Mathematics", value: 54 },
      { name: "Machine learning", value: 31 },
      { name: "MLOps", value: 12 },
    ];

    return {
      focusedLearning: "19h 24m",
      activitiesCompleted: 32,
      averageAssessment: `${profile.assessmentScore || 84}%`,
      currentStreakDays: profile.streakDays || 12,
      weeklyGoalHours: profile.hours || 8,
      weeklyLoggedMinutes: profile.weeklyMinutes || 275,
      weeklyActivity,
      competencies,
      roleReadinessPercent: profile.roleReadinessPercent || 31,
      targetRole: profile.goal || "AI Engineer",
      masteredCount: 6,
      developingCount: 4,
      notStartedCount: 7,
    };
  }
}

export const analyticsService = new AnalyticsService();
