import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validate } from "../../common/middleware/validate.js";
import { requireAuth } from "../../common/middleware/auth.js";
import { registerSchema, loginSchema, updateProfileSchema } from "./auth.schemas.js";

const router = Router();

router.post("/register", validate({ body: registerSchema }), (req, res, next) => authController.register(req, res, next));
router.post("/login", validate({ body: loginSchema }), (req, res, next) => authController.login(req, res, next));
router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/me", requireAuth, (req, res, next) => authController.getMe(req, res, next));
router.patch("/profile", requireAuth, validate({ body: updateProfileSchema }), (req, res, next) => authController.updateProfile(req, res, next));

export const authRoutes = router;
