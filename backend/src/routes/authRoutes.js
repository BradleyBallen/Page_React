import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Inicia el flujo de login con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback después del login
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    // Generar JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Inicio de sesión con Google exitoso",
      token,
      user,
    });
  }
);

export default router;
