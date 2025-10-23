import { Request, Response } from "express";
import * as userService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await userService.deleteUser(id);
  res.json({ message: "User deleted successfully" });
};

