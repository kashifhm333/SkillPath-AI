import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { requestLogger } from "./common/middleware/request-logger.js";
import { errorHandler } from "./common/middleware/error-handler.js";
import { NotFoundError } from "./common/errors.js";
import { isMongoConnected } from "./database/mongodb.js";

// Import modules
import { authRoutes } from "./modules/auth/auth.routes.js";
import { roadmapRoutes } from "./modules/roadmap/roadmap.routes.js";
import { assessmentRoutes } from "./modules/assessment/assessment.routes.js";
import { practiceRoutes } from "./modules/practice/practice.routes.js";
import { projectsRoutes } from "./modules/projects/projects.routes.js";
import { resourcesRoutes } from "./modules/resources/resources.routes.js";
import { analyticsRoutes } from "./modules/analytics/analytics.routes.js";
import { goalsRoutes } from "./modules/goals/goals.routes.js";
import { notificationsRoutes } from "./modules/notifications/notifications.routes.js";

export function createApp(): Express {
  const app = express();

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://*.vercel.app", ...env.CLIENT_ORIGIN.split(",")],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS Configuration
  const allowedOrigins = env.CLIENT_ORIGIN.split(",").map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin, matched origin, wildcard, or any vercel.app preview
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          allowedOrigins.includes("*") ||
          origin.endsWith(".vercel.app") ||
          process.env.NODE_ENV !== "production"
        ) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-correlation-id"],
    })
  );

  // Rate Limiting
  const generalLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { message: "Too many requests, please try again later" } },
  });
  app.use("/api/", generalLimiter);

  // Request parsing
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser(env.COOKIE_SECRET));

  // Request correlation & logging
  app.use(requestLogger);

  // Root Status & Health Checks
  app.get("/", (_req, res) => {
    res.status(200).json({
      name: "SkillPath AI API",
      status: "HEALTHY",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "UP",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  app.get("/health/ready", (_req, res) => {
    const mongoStatus = isMongoConnected() ? "CONNECTED" : "DISCONNECTED";
    res.status(200).json({
      status: "READY",
      database: "CONNECTED",
      mongodb: mongoStatus,
      timestamp: new Date().toISOString(),
    });
  });

  // Mount API Domain Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/roadmap", roadmapRoutes);
  app.use("/api/assessment", assessmentRoutes);
  app.use("/api/practice", practiceRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/resources", resourcesRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/goals", goalsRoutes);
  app.use("/api/notifications", notificationsRoutes);

  // 404 Route Handler
  app.use((req, _res, next) => {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}
