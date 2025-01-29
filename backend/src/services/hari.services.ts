import prisma from "../prisma/prismaClient";
import { CreateJenisInput, UpdateJenisInput } from "../types/hari.types";

export const getAllGedungsService = async () => {
  return await prisma.hari.findMany();
};

export const getGedungByIdService = async (id: number) => {
  const gedung = await prisma.hari.findUnique({ where: { id } });
  if (!gedung) throw new Error("gedung not found");
  return gedung;
};

export const createGedungService = async (data: CreateJenisInput) => {
  return await prisma.hari.create({
    data: {
      hari: data.nama,
      kodeHari: data.kodeHari,
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
