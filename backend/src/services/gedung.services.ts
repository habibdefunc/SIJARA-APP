import prisma from "../prisma/prismaClient";
import { CreateGedungInput, UpdateGedungInput } from "../types/gedung.types";

export const getAllGedungsService = async () => {
  return await prisma.ruangan.findMany();
};

export const getGedungByIdService = async (id: number) => {
  const gedung = await prisma.ruangan.findUnique({ where: { id } });
  if (!gedung) throw new Error("gedung not found");
  return gedung;
};

export const createGedungService = async (data: CreateGedungInput) => {
  return await prisma.ruangan.create({
    data: {
      nama: data.nama,
      kodeRuangan: data.kodeRuangan,
    },
  });
};

export const updateGedungService = async (
  id: number,
  data: UpdateGedungInput
) => {
  return await prisma.ruangan.update({
    where: { id },
    data,
  });
};

export const deleteGedungService = async (id: number) => {
  return await prisma.ruangan.delete({
    where: { id },
  });
};
