import { Router } from "express";
import {
  getAllAgenda,
  getAgendaById,
  createAgenda,
  updateAgenda,
  deleteAgenda,
} from "../controllers/rapat.controller";

const router = Router();

router.get("/", getAllAgenda);
router.get("/:id", getAgendaById);
router.post("/", createAgenda);
router.patch("/:id", updateAgenda);
router.delete("/:id", deleteAgenda);

export default router;
