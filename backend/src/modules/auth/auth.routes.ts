import { Router } from "express";
import passport from "../../config/passport";
import { googleCallback } from "./auth.controller";

const router = Router();

// 🔹 Iniciar el flujo de autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline", // 🟢 Permite refresh tokens (opcional)
    prompt: "consent",     // 🟢 Fuerza selección de cuenta (evita errores con cuentas previas)
  })
);

// 🔹 Callback (Google redirige aquí tras el login)
router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("⚙️ Callback alcanzado, ejecutando authenticate...");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/api/auth/failure",
    session: false, // 🟢 evita errores si no usas express-session
  }),
  (req, res, next) => {
    console.log("✅ Autenticación completada, ejecutando controlador...");
    next();
  },
  googleCallback
);

// 🔹 En caso de fallo
router.get("/failure", (req, res) => {
  console.log("❌ Error en autenticación con Google");
  res.status(401).json({ error: "Error en autenticación con Google" });
});

export default router;
