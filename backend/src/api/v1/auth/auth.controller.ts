import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../../prisma/client";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hash, // Cambiado de passwordHash a password
        name,
        age: 0 // Necesario porque age es requerido en el schema
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};
