import { type Request, type Response, type NextFunction } from "express";
import { roadmapService } from "./roadmap.service.js";

export class RoadmapController {
  public async getRoadmap(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roadmapService.getRoadmap(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async getStage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roadmapService.getStage(req.params.stageId as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async getTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roadmapService.getTopic(req.params.topicId as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async toggleTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roadmapService.toggleTopic(req.params.topicId as string, req.body?.completed);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async adaptRoadmap(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roadmapService.adaptRoadmap(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const roadmapController = new RoadmapController();
