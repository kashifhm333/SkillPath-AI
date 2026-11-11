import type { Request, Response } from "express";

let appInstance: any = null;
let initPromise: Promise<any> | null = null;

async function getApp() {
  if (!initPromise) {
    initPromise = (async () => {
      const { createApp } = await import("../app/backend/dist/app.js");
      const { db } = await import("../app/backend/dist/database/db.js");
      const { connectMongoDB } = await import("../app/backend/dist/database/mongodb.js");

      await db.init();
      if (process.env.MONGODB_URI) {
        await connectMongoDB().catch(() => {});
      }
      return createApp();
    })();
  }
  return initPromise;
}

export default async function handler(req: Request, res: Response) {
  const app = await getApp();
  return app(req, res);
}
