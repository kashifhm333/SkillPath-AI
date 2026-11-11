import { Router } from "express";
import { practiceController } from "./practice.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";

const router = Router();

router.get("/", optionalAuth, (req, res, next) => practiceController.getItems(req, res, next));
router.post("/:id/review", optionalAuth, (req, res, next) => practiceController.reviewItem(req, res, next));
router.post("/start-session", optionalAuth, (req, res, next) => practiceController.startSession(req, res, next));

export const practiceRoutes = router;
