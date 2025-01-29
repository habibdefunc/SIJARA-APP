import prisma from "../prisma/prismaClient";
import { CreateJenisInput, UpdateJenisInput } from "../types/jenis.types";

export const getAllGedungsService = async () => {
  return await prisma.jenis.findMany();
};

export const getGedungByIdService = async (id: number) => {
  const gedung = await prisma.jenis.findUnique({ where: { id } });
  if (!gedung) throw new Error("gedung not found");
  return gedung;
};

export const createGedungService = async (data: CreateJenisInput) => {
  return await prisma.jenis.create({
    data: {
      nama: data.nama,
      kodeJenisRapat: data.kodeJenisRapat,
    },
  });
};

export const updateGedungService = async (
  id: number,
  data: UpdateJenisInput
) => {
  return await prisma.jenis.update({
    where: { id },
    data,
  });
};

export const deleteGedungService = async (id: number) => {
  return await prisma.jenis.delete({
    where: { id },
  });
};
