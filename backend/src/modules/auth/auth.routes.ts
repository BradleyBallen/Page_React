import { Router } from "express";
import passport from "../../config/passport";
import { googleCallback } from "./auth.controller";

const router = Router();

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback (donde Google redirige después de login)
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
