import { type Request, type Response, type NextFunction } from "express";
import crypto from "node:crypto";
import { logger } from "../logger.js";

declare global {
  namespace Express {
    interface Request {
      correlationId: string;
      startTime: number;
    }
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const correlationId = (req.headers["x-correlation-id"] as string) || crypto.randomUUID();
  req.correlationId = correlationId;
  req.startTime = Date.now();

  res.setHeader("x-correlation-id", correlationId);

  res.on("finish", () => {
    const duration = Date.now() - req.startTime;
    logger.info("HTTP Request Completed", {
      correlationId,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: duration,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  });

  next();
}
