import express from "express";
import {
  createGedung,
  getAllGedungs,
  getGedungById,
  updateGedung,
  deleteGedung,
} from "../controllers/hari.controller";

const router = express.Router();

router.get("/", getAllGedungs);
router.get("/:id", getGedungById);
router.post("/", createGedung);
router.patch("/:id", updateGedung);
router.delete("/:id", deleteGedung);

export default router;
