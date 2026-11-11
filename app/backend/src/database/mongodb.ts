import mongoose from "mongoose";
import { env } from "../config/env.js";
import { logger } from "../common/logger.js";
import { getDefaultSeeds } from "./seeds.js";
import {
  UserModel,
  LearnerProfileModel,
  StageModel,
  QuestionModel,
  PracticeItemModel,
  ProjectModel,
  ResourceModel,
  MilestoneModel,
  NotificationModel,
} from "./models/index.js";

let isConnected = false;

export async function connectMongoDB(): Promise<boolean> {
  if (isConnected) return true;

  try {
    logger.info(`Connecting to MongoDB at ${env.MONGODB_URI}...`);
    
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    logger.info("MongoDB successfully connected!");

    // Seed default data if database is empty
    await seedMongoDBIfEmpty();

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", { error: String(err) });
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
      isConnected = false;
    });

    return true;
  } catch (err) {
    logger.error("Failed to connect to MongoDB", { error: String(err) });
    isConnected = false;
    return false;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (!isConnected) return;
  try {
    await mongoose.disconnect();
    isConnected = false;
    logger.info("MongoDB connection closed gracefully.");
  } catch (err) {
    logger.error("Error disconnecting from MongoDB", { error: String(err) });
  }
}

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export async function seedMongoDBIfEmpty(): Promise<void> {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      logger.info("MongoDB collections already contain data. Skipping seed.");
      return;
    }

    logger.info("Seeding MongoDB collections with default SkillPath AI domain data...");
    const seeds = await getDefaultSeeds();

    await Promise.all([
      UserModel.insertMany(seeds.users),
      LearnerProfileModel.insertMany(seeds.profiles),
      StageModel.insertMany(seeds.stages),
      QuestionModel.insertMany(seeds.questions),
      PracticeItemModel.insertMany(seeds.practiceItems),
      ProjectModel.insertMany(seeds.projects),
      ResourceModel.insertMany(seeds.resources),
      MilestoneModel.insertMany(seeds.milestones),
      NotificationModel.insertMany(seeds.notifications),
    ]);

    logger.info("MongoDB seed completed successfully!");
  } catch (err) {
    logger.error("Error during MongoDB seeding", { error: String(err) });
  }
}
