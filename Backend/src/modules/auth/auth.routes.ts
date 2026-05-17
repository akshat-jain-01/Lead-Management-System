import { Router } from "express";
import { login, register } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "./auth.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.get( "/profile", authMiddleware, (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  });

  router.get( "/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
});

export default router;