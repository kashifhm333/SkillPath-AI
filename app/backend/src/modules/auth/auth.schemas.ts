import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fields: z.array(z.string()).optional(),
  goal: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  goal: z.string().optional(),
  fields: z.array(z.string()).optional(),
  level: z.string().optional(),
  hours: z.number().min(1).max(80).optional(),
  learningStyle: z.string().optional(),
  language: z.string().optional(),
  ecosystem: z.string().optional(),
  operatingSystem: z.string().optional(),
  onboardingComplete: z.boolean().optional(),
});
