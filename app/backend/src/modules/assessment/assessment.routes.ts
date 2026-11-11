import { Router } from "express";
import { assessmentController } from "./assessment.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";
import { validate } from "../../common/middleware/validate.js";
import { z } from "zod";

const router = Router();

const submitSchema = z.object({
  answers: z.array(z.number()),
});

router.get("/questions", (req, res, next) => assessmentController.getQuestions(req, res, next));
router.post("/submit", optionalAuth, validate({ body: submitSchema }), (req, res, next) => assessmentController.submitAssessment(req, res, next));

export const assessmentRoutes = router;
