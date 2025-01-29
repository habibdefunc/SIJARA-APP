import { Request, Response, NextFunction } from "express";
import {
  createGedungService,
  deleteGedungService,
  getAllGedungsService,
  getGedungByIdService,
  updateGedungService,
} from "../services/jenis.services";
import { CreateJenisInput, UpdateJenisInput } from "../types/jenis.types";

export const getAllGedungs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gedungs = await getAllGedungsService();
    res.status(200).json(gedungs);
  } catch (error) {
    next(error);
  }
};

export const getGedungById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gedung = await getGedungByIdService(parseInt(req.params.id));
    res.status(200).json(gedung);
  } catch (error) {
    next(error);
  }
};

export const createGedung = async (
  req: Request<{}, {}, CreateJenisInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const gedung = await createGedungService(req.body);
    res.status(201).json(gedung);
  } catch (error) {
    next(error);
  }
};

export const updateGedung = async (
  req: Request<{ id: string }, {}, UpdateJenisInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const gedung = await updateGedungService(parseInt(req.params.id), req.body);
    res.status(200).json(gedung);
  } catch (error) {
    next(error);
  }
};

export const deleteGedung = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteGedungService(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
