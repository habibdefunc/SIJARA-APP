import { Request, Response, NextFunction } from "express";
import {
  createPimpinanService,
  deletePimpinanService,
  getAllPimpinanService,
  getPimpinanByIdService,
  updatePimpinanService,
} from "../services/pimpinan.services";
import {
  CreatePimpinanInput,
  UpdatePimpinanInput,
} from "../types/pimpinan.types";

export const getAllPimpinans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pimpinans = await getAllPimpinanService();
    res.status(200).json(pimpinans);
  } catch (error) {
    next(error);
  }
};

export const getPimpinanById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pimpinan = await getPimpinanByIdService(parseInt(req.params.id));
    res.status(200).json(pimpinan);
  } catch (error) {
    next(error);
  }
};

export const createPimpinan = async (
  req: Request<{}, {}, CreatePimpinanInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pimpinan = await createPimpinanService(req.body);
    res.status(201).json(pimpinan);
  } catch (error) {
    next(error);
  }
};

export const updatePimpinan = async (
  req: Request<{ id: string }, {}, UpdatePimpinanInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pimpinan = await updatePimpinanService(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(pimpinan);
  } catch (error) {
    next(error);
  }
};

export const deletePimpinan = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePimpinanService(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
