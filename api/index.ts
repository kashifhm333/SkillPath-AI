import type { Request, Response } from "express";
import { createApp } from "../app/backend/dist/app.js";
import { db } from "../app/backend/dist/database/db.js";
import { connectMongoDB } from "../app/backend/dist/database/mongodb.js";

let initialized = false;
let appInstance: any = null;

export default async function handler(req: Request, res: Response) {
  if (!initialized) {
    await db.init();
    if (process.env.MONGODB_URI) {
      await connectMongoDB().catch(() => {});
    }
    appInstance = createApp();
    initialized = true;
  }
  return appInstance(req, res);
}
