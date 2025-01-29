import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import gedungRoutes from "./routes/gedung.routes";
import pimpinanRoutes from "./routes/pimpinan.routes";
import hariRoutes from "./routes/hari.routes";
import jenisRoutes from "./routes/jenis.routes";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/buildings", gedungRoutes);
app.use("/api/leaders", pimpinanRoutes);
app.use("/api/days", hariRoutes);
app.use("/api/meets", jenisRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
