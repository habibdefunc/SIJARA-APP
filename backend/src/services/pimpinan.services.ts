import prisma from "../prisma/prismaClient";
import {
  CreatePimpinanInput,
  UpdatePimpinanInput,
} from "../types/pimpinan.types";

export const getAllPimpinanService = async () => {
  return await prisma.pimpinan.findMany();
};

export const getPimpinanByIdService = async (id: number) => {
  const pimpinan = await prisma.pimpinan.findUnique({ where: { id } });
  if (!pimpinan) throw new Error("pimpinan not found");
  return pimpinan;
};

export const createPimpinanService = async (data: CreatePimpinanInput) => {
  return await prisma.pimpinan.create({
    data: {
      nama: data.nama,
      kodePimpinan: data.kodePimpinan,
    },
  });
};

export const updatePimpinanService = async (
  id: number,
  data: UpdatePimpinanInput
) => {
  return await prisma.pimpinan.update({
    where: { id },
    data,
  });
};

export const deletePimpinanService = async (id: number) => {
  return await prisma.pimpinan.delete({
    where: { id },
  });
};
