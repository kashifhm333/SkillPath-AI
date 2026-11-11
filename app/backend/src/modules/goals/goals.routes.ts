import { Router } from "express";
import { goalsController } from "./goals.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";
import { validate } from "../../common/middleware/validate.js";
import { z } from "zod";

const router = Router();

const createMilestoneSchema = z.object({
  title: z.string().min(3),
  targetDate: z.string().min(2),
});

const updateMilestoneSchema = z.object({
  progress: z.number().min(0).max(100).optional(),
  status: z.string().optional(),
});

router.get("/", optionalAuth, (req, res, next) => goalsController.getGoals(req, res, next));
router.post("/milestones", optionalAuth, validate({ body: createMilestoneSchema }), (req, res, next) => goalsController.createMilestone(req, res, next));
router.patch("/milestones/:id", optionalAuth, validate({ body: updateMilestoneSchema }), (req, res, next) => goalsController.updateMilestone(req, res, next));

export const goalsRoutes = router;
