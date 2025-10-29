import { Request, Response } from "express";
import passport from "passport";

// 🔹 Inicia el flujo de autenticación con Google
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// 🔹 Callback de Google
export const googleCallback = (req: Request, res: Response, next: Function) => {
  passport.authenticate("google", (err: any, user: any) => {
    if (err) return next(err);
    if (!user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=failed`);

    // Aquí podrías generar un JWT y devolverlo
    // Pero para prueba en Postman solo redirigimos
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard?user=${user.email}`);
  })(req, res, next);
};
