import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import gRNRoutes from "./routes/grn";
import materialsRoutes from "./routes/materials";
import issueNoteRoutes from "./routes/issueNotes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/grn", gRNRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/issue-notes", issueNoteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! :)");
});

export default app;
