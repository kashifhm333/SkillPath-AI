import { type Request, type Response, type NextFunction } from "express";
import { analyticsService } from "./analytics.service.js";

export class AnalyticsController {
  public async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getAnalytics(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const analyticsController = new AnalyticsController();
