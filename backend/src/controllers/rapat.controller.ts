import { Request, Response } from "express";
import {
  createAgendaService,
  getAllAgendaService,
  getAgendaByIdService,
  updateAgendaService,
  deleteAgendaService,
} from "../services/rapat.services";

export const getAllAgenda = async (req: Request, res: Response) => {
  try {
    const agenda = await getAllAgendaService();
    res.status(200).json(agenda);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAgendaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const agenda = await getAgendaByIdService(id);
    res.status(200).json(agenda);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createAgenda = async (req: Request, res: Response) => {
  try {
    const agenda = await createAgendaService(req.body);
    res.status(201).json(agenda);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateAgenda = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const agenda = await updateAgendaService(id, req.body);
    res.status(200).json(agenda);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteAgenda = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteAgendaService(id);
    res.status(200).json({ message: "Agenda berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
