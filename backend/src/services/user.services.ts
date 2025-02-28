import prisma from "../prisma/prismaClient";
import { CreateUserInput, UpdateUserInput } from "../types/user.types";
import bcrypt from "bcryptjs";

export const getAllUsersService = async () => {
  return await prisma.user.findMany();
};

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};

export const createUserService = async (data: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      nama: data.nama,
      username: data.username,
      password: hashedPassword,
      role: data.role || "USER",
    },
  });
};

export const updateUserService = async (id: number, data: UpdateUserInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUserService = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
