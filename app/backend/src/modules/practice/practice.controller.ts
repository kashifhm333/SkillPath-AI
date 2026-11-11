import { type Request, type Response, type NextFunction } from "express";
import { practiceService } from "./practice.service.js";

export class PracticeController {
  public async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await practiceService.getPracticeItems(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async reviewItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await practiceService.reviewItem(req.params.id as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async startSession(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await practiceService.startSmartSession(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const practiceController = new PracticeController();
