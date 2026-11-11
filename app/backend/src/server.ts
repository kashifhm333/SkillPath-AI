import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { db } from "./database/db.js";
import { connectMongoDB, disconnectMongoDB } from "./database/mongodb.js";
import { logger } from "./common/logger.js";

async function bootstrap() {
  try {
    // 1. Initialize persistent database layer
    await db.init();

    // 2. Connect to MongoDB
    await connectMongoDB();

    // 3. Create Express app
    const app = createApp();

    // 4. Start server
    const server = app.listen(env.PORT, () => {
      logger.info(`SkillPath Backend Service listening on port ${env.PORT}`, {
        port: env.PORT,
        nodeEnv: env.NODE_ENV,
      });
    });

    // 5. Graceful Shutdown Handlers
    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await db.persist();
          await disconnectMongoDB();
          logger.info("Databases flushed and connections closed. Process exited cleanly.");
          process.exit(0);
        } catch (err) {
          logger.error("Error during graceful shutdown", { error: String(err) });
          process.exit(1);
        }
      });

      // Force shutdown after timeout
      setTimeout(() => {
        logger.error("Forceful shutdown after timeout expiration.");
        process.exit(1);
      }, 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (err) {
    logger.error("Failed to bootstrap server", { error: String(err) });
    process.exit(1);
  }
}

bootstrap();
