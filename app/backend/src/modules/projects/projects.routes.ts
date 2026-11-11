import { Router } from "express";
import { projectsController } from "./projects.controller.js";
import { optionalAuth } from "../../common/middleware/auth.js";
import { validate } from "../../common/middleware/validate.js";
import { z } from "zod";

const router = Router();

const submitSchema = z.object({
  submissionUrl: z.string().url("Must be a valid repository or deployment URL"),
  notes: z.string().optional(),
});

router.get("/", (req, res, next) => projectsController.getProjects(req, res, next));
router.get("/:id", (req, res, next) => projectsController.getProject(req, res, next));
router.post("/:id/submit", optionalAuth, validate({ body: submitSchema }), (req, res, next) => projectsController.submitProject(req, res, next));

export const projectsRoutes = router;
