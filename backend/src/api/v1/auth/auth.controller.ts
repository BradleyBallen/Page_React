import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;

    if (!user) {
      return res.status(401).json({ message: "Error en la autenticación" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Enviar el token al frontend (puedes redirigirlo también)
    res.status(200).json({
      message: "Autenticación con Google exitosa",
      user,
      token,
    });
  } catch (error) {
    console.error("Error en googleCallback:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
