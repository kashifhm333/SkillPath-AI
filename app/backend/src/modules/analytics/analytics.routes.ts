import { Router } from "express";
import { analyticsController } from "./analytics.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";

const router = Router();

router.get("/", optionalAuth, (req, res, next) => analyticsController.getAnalytics(req, res, next));

export const analyticsRoutes = router;
