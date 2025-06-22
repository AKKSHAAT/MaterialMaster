import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import gRNRoutes from "./routes/grn";
import materialsRoutes from "./routes/materials";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use("/api/grn", gRNRoutes);
app.use("/api/materials", materialsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! :)");
});

export default app;
