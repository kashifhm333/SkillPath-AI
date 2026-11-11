import { type Request, type Response, type NextFunction } from "express";
import { notificationsService } from "./notifications.service.js";

export class NotificationsController {
  public async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationsService.getNotifications(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async markAllRead(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationsService.markAllRead(req.user?.userId);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }

  public async markOneRead(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationsService.markOneRead(req.params.id as string);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const notificationsController = new NotificationsController();
