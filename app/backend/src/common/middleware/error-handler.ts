import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors.js";
import { logger } from "../logger.js";
import { env } from "../../config/env.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const correlationId = req.correlationId || "unknown";

  if (err instanceof AppError) {
    logger.warn(`Operational Error: ${err.message}`, {
      correlationId,
      statusCode: err.statusCode,
      details: err.details,
      path: req.originalUrl,
    });

    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        details: err.details,
      },
      correlationId,
    });
  }

  // Unhandled / Internal Server Errors
  logger.error(`Unhandled Server Error: ${err.message}`, {
    correlationId,
    errorName: err.name,
    stack: err.stack,
    path: req.originalUrl,
  });

  const message =
    env.NODE_ENV === "production"
      ? "An internal server error occurred"
      : err.message || "An unexpected error occurred";

  res.status(500).json({
    success: false,
    error: {
      message,
      ...(env.NODE_ENV !== "production" && { stack: err.stack }),
    },
    correlationId,
  });
}
