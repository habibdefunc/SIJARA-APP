import express from "express";
import {
  createPimpinan,
  getAllPimpinans,
  getPimpinanById,
  updatePimpinan,
  deletePimpinan,
} from "../controllers/pimpinan.controller";

const router = express.Router();

router.get("/", getAllPimpinans);
router.get("/:id", getPimpinanById);
router.post("/", createPimpinan);
router.patch("/:id", updatePimpinan);
router.delete("/:id", deletePimpinan);

export default router;
