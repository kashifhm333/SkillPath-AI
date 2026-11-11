import { type Request, type Response, type NextFunction } from "express";
import { resourcesService } from "./resources.service.js";

export class ResourcesController {
  public async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.query.filter as string | undefined;
      const search = req.query.search as string | undefined;
      const data = await resourcesService.getResources(filter, search);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async toggleSave(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await resourcesService.toggleSave(req.params.id as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const resourcesController = new ResourcesController();
