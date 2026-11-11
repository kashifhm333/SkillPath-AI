import { Router } from "express";
import { roadmapController } from "./roadmap.controller.js";
import { optionalAuth, requireAuth } from "../../common/middleware/auth.js";

const router = Router();

router.get("/", optionalAuth, (req, res, next) => roadmapController.getRoadmap(req, res, next));
router.get("/stages/:stageId", (req, res, next) => roadmapController.getStage(req, res, next));
router.get("/topics/:topicId", (req, res, next) => roadmapController.getTopic(req, res, next));
router.post("/topics/:topicId/toggle", optionalAuth, (req, res, next) => roadmapController.toggleTopic(req, res, next));
router.post("/adapt", optionalAuth, (req, res, next) => roadmapController.adaptRoadmap(req, res, next));

export const roadmapRoutes = router;
