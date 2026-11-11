import { type Request, type Response, type NextFunction } from "express";
import { assessmentService } from "./assessment.service.js";

export class AssessmentController {
  public async getQuestions(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await assessmentService.getQuestions();
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async submitAssessment(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await assessmentService.submitAssessment(req.user?.userId, req.body.answers);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const assessmentController = new AssessmentController();
