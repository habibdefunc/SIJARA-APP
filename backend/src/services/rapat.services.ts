import prisma from "../prisma/prismaClient";
import { CreateAgendaInput, UpdateAgendaInput } from "../types/rapat.types";

export const getAllAgendaService = async () => {
  return await prisma.agendaRapat.findMany({
    orderBy: [{ kodeHari: "asc" }, { jam: "asc" }],
    include: {
      ruangan: true,
      hari: true,
      pimpinan: true,
      jenisRapat: true,
    },
  });
};

export const getAgendaByIdService = async (id: number) => {
  const agenda = await prisma.agendaRapat.findUnique({
    where: { id },
    include: {
      ruangan: true,
      hari: true,
      pimpinan: true,
      jenisRapat: true,
    },
  });

  if (!agenda) throw new Error("Agenda Rapat tidak ditemukan");
  return agenda;
};

export const createAgendaService = async (data: CreateAgendaInput) => {
  const agendas = await prisma.agendaRapat.findMany({
    where: {
      kodeRuangan: data.kodeRuangan,
      kodeHari: data.kodeHari,
    },
    orderBy: [{ jam: "asc" }],
  });

  const conflict = agendas.find((agenda) => agenda.jam === data.jam);
  if (conflict) {
    throw new Error("Ruangan sudah digunakan pada waktu tersebut.");
  }

  return await prisma.agendaRapat.create({
    data: {
      nama: data.nama,
      kodeRuangan: data.kodeRuangan,
      kodeHari: data.kodeHari,
      jam: data.jam,
      kodePimpinan: data.kodePimpinan,
      peserta: data.peserta,
      jenisRapatId: data.jenisRapatId,
    },
  });
};

export const updateAgendaService = async (
  id: number,
  data: UpdateAgendaInput
) => {
  return await prisma.agendaRapat.update({
    where: { id },
    data,
  });
};

export const deleteAgendaService = async (id: number) => {
  return await prisma.agendaRapat.delete({
    where: { id },
  });
};
