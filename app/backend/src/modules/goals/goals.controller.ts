import { type Request, type Response, type NextFunction } from "express";
import { goalsService } from "./goals.service.js";

export class GoalsController {
  public async getGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await goalsService.getGoals(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async createMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await goalsService.createMilestone(req.user?.userId, req.body.title, req.body.targetDate);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async updateMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await goalsService.updateMilestone(req.params.id as string, req.body);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const goalsController = new GoalsController();
