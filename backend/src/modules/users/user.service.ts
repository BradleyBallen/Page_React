import prisma from "../../prisma/client";
import type { User } from "@prisma/client";

export const createUser = async (data: Omit<User, "id" | "createdAt" | "updatedAt">) => {
  return await prisma.user.create({ data });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};


export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: number, data: Partial<User>) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
