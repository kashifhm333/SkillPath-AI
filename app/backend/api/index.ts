import type { Request, Response } from "express";
import { createApp } from "../src/app.js";
import { db } from "../src/database/db.js";
import { connectMongoDB } from "../src/database/mongodb.js";

let initialized = false;
const app = createApp();

export default async function handler(req: Request, res: Response) {
  if (!initialized) {
    await db.init();
    if (process.env.MONGODB_URI) {
      await connectMongoDB().catch(() => {});
    }
    initialized = true;
  }
  return app(req, res);
}
