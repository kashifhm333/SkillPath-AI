import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { db } from "../../database/db.js";
import { env } from "../../config/env.js";
import { BadRequestError, UnauthorizedError, ConflictError, NotFoundError } from "../../common/errors.js";
import type { z } from "zod";
import type { registerSchema, loginSchema, updateProfileSchema } from "./auth.schemas.js";

export class AuthService {
  public async register(data: z.infer<typeof registerSchema>) {
    const dataStore = db.getData();
    const existing = dataStore.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    if (existing) {
      throw new ConflictError("An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = `usr_${crypto.randomUUID()}`;

    const newUser = {
      id: userId,
      email: data.email.toLowerCase(),
      name: data.name,
      passwordHash,
      role: "learner" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newProfile = {
      userId,
      goal: data.goal || "Become an AI Engineer",
      fields: data.fields || ["Artificial Intelligence"],
      level: "Some experience",
      hours: 8,
      learningStyle: "Mixed",
      language: "English",
      ecosystem: "Cloud agnostic",
      operatingSystem: "Linux",
      onboardingComplete: false,
      assessmentScore: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      weeklyMinutes: 0,
      roleReadinessPercent: 10,
    };

    dataStore.users.push(newUser);
    dataStore.profiles.push(newProfile);
    await db.persist();

    const token = this.generateToken(newUser);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      profile: newProfile,
      token,
    };
  }

  public async login(data: z.infer<typeof loginSchema>) {
    const dataStore = db.getData();
    const user = dataStore.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

    if (!user) {
      // Generic message to avoid email enumeration
      throw new UnauthorizedError("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const profile = dataStore.profiles.find((p) => p.userId === user.id) || {
      userId: user.id,
      goal: "Become an AI Engineer",
      fields: ["Artificial Intelligence"],
      level: "Some experience",
      hours: 8,
      learningStyle: "Mixed",
      language: "English",
      ecosystem: "Cloud agnostic",
      operatingSystem: "Linux",
      onboardingComplete: false,
      assessmentScore: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
      weeklyMinutes: 0,
      roleReadinessPercent: 15,
    };

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      profile,
      token,
    };
  }

  public async getCurrentUser(userId: string) {
    const dataStore = db.getData();
    const user = dataStore.users.find((u) => u.id === userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const profile = dataStore.profiles.find((p) => p.userId === userId);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      profile: profile || null,
    };
  }

  public async updateProfile(userId: string, patch: z.infer<typeof updateProfileSchema>) {
    const dataStore = db.getData();
    const user = dataStore.users.find((u) => u.id === userId);
    if (!user) throw new NotFoundError("User not found");

    if (patch.name) {
      user.name = patch.name;
      user.updatedAt = new Date().toISOString();
    }

    let profile = dataStore.profiles.find((p) => p.userId === userId);
    if (!profile) {
      profile = {
        userId,
        goal: patch.goal || "Become an AI Engineer",
        fields: patch.fields || ["Artificial Intelligence"],
        level: patch.level || "Some experience",
        hours: patch.hours || 8,
        learningStyle: patch.learningStyle || "Mixed",
        language: patch.language || "English",
        ecosystem: patch.ecosystem || "Cloud agnostic",
        operatingSystem: patch.operatingSystem || "Linux",
        onboardingComplete: patch.onboardingComplete ?? false,
        assessmentScore: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        weeklyMinutes: 0,
        roleReadinessPercent: 20,
      };
      dataStore.profiles.push(profile);
    } else {
      Object.assign(profile, patch);
    }

    await db.persist();

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      profile,
    };
  }

  private generateToken(user: { id: string; email: string; name: string; role: "learner" | "admin" | "mentor" }): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }
}

export const authService = new AuthService();
