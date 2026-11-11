import { type Request, type Response, type NextFunction } from "express";
import { projectsService } from "./projects.service.js";

export class ProjectsController {
  public async getProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await projectsService.getProjects();
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await projectsService.getProject(req.params.id as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async submitProject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await projectsService.submitProject(req.params.id as string, req.body.submissionUrl, req.body.notes);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const projectsController = new ProjectsController();
