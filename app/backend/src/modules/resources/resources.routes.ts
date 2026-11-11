import { Router } from "express";
import { resourcesController } from "./resources.controller.js";

const router = Router();

router.get("/", (req, res, next) => resourcesController.getResources(req, res, next));
router.post("/:id/toggle-save", (req, res, next) => resourcesController.toggleSave(req, res, next));

export const resourcesRoutes = router;
