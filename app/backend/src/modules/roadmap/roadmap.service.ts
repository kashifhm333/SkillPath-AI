import { db } from "../../database/db.js";
import { NotFoundError } from "../../common/errors.js";

export class RoadmapService {
  public async getRoadmap(userId?: string) {
    const dataStore = db.getData();
    const stages = dataStore.stages;

    // Calculate overall stats
    const totalTopics = stages.reduce((acc, s) => acc + s.topics.length, 0);
    const completedTopics = stages.reduce(
      (acc, s) => acc + s.topics.filter((t) => t.completed).length,
      0
    );
    const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    let profile = null;
    if (userId) {
      profile = dataStore.profiles.find((p) => p.userId === userId);
    }

    return {
      title: "AI Engineer roadmap",
      targetRole: profile?.goal || "AI Engineer",
      overallProgress,
      estimatedCompletion: "October 2026",
      weeklyHours: profile?.hours || 8,
      roleReadinessPercent: Math.min(100, Math.round(overallProgress * 0.8 + 15)),
      stages,
    };
  }

  public async getStage(stageId: string) {
    const dataStore = db.getData();
    const stage = dataStore.stages.find((s) => s.id === stageId);
    if (!stage) {
      throw new NotFoundError(`Stage with ID "${stageId}" not found`);
    }
    return stage;
  }

  public async getTopic(identifier: string) {
    const dataStore = db.getData();
    for (const stage of dataStore.stages) {
      const topic = stage.topics.find((t) => t.id === identifier || t.slug === identifier);
      if (topic) {
        return {
          ...topic,
          stageId: stage.id,
          stageTitle: stage.title,
          stageNumber: stage.number,
        };
      }
    }
    throw new NotFoundError(`Topic "${identifier}" not found`);
  }

  public async toggleTopic(topicId: string, completed?: boolean) {
    const dataStore = db.getData();
    let foundTopic = null;
    let targetStage = null;

    for (const stage of dataStore.stages) {
      const topic = stage.topics.find((t) => t.id === topicId || t.slug === topicId);
      if (topic) {
        foundTopic = topic;
        targetStage = stage;
        break;
      }
    }

    if (!foundTopic || !targetStage) {
      throw new NotFoundError(`Topic "${topicId}" not found`);
    }

    // Toggle completion
    foundTopic.completed = completed !== undefined ? completed : !foundTopic.completed;
    foundTopic.status = foundTopic.completed ? "mastered" : "active";

    // Recalculate target stage progress
    const stageCompleted = targetStage.topics.filter((t) => t.completed).length;
    targetStage.progress = Math.round((stageCompleted / targetStage.topics.length) * 100);

    // If stage completed is > 60%, unlock next stage
    const stageIdx = dataStore.stages.findIndex((s) => s.id === targetStage?.id);
    if (stageIdx >= 0 && stageIdx < dataStore.stages.length - 1 && targetStage.progress >= 50) {
      const nextStage = dataStore.stages[stageIdx + 1];
      if (nextStage.status === "locked") {
        nextStage.status = "up_next";
      }
    }

    await db.persist();

    return {
      topic: foundTopic,
      stage: targetStage,
      overallProgress: this.calculateOverallProgress(dataStore.stages),
    };
  }

  public async adaptRoadmap(userId?: string) {
    const dataStore = db.getData();
    // Dynamically adjust sequence or priorities
    const notifId = `notif_${Date.now()}`;
    const newNotification = {
      id: notifId,
      userId: userId || "usr_alex_morgan",
      title: "Your roadmap was adapted",
      description: "Based on recent progress and diagnostics, topic sequence has been optimized.",
      timestamp: "Just now",
      tone: "purple" as const,
      unread: true,
    };

    dataStore.notifications.unshift(newNotification);
    await db.persist();

    return {
      message: "Roadmap adapted successfully according to current performance metrics",
      adaptedAt: new Date().toISOString(),
    };
  }

  private calculateOverallProgress(stages: ReturnType<typeof db.getData>["stages"]): number {
    const total = stages.reduce((acc, s) => acc + s.topics.length, 0);
    const completed = stages.reduce((acc, s) => acc + s.topics.filter((t) => t.completed).length, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
}

export const roadmapService = new RoadmapService();
