import { Router } from "express";
import { notificationsController } from "./notifications.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";

const router = Router();

router.get("/", optionalAuth, (req, res, next) => notificationsController.getNotifications(req, res, next));
router.post("/mark-all-read", optionalAuth, (req, res, next) => notificationsController.markAllRead(req, res, next));
router.patch("/:id/read", (req, res, next) => notificationsController.markOneRead(req, res, next));

export const notificationsRoutes = router;
