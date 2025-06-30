import { Router } from "express";
import prisma from "../prisma";
import { Request, Response } from "express";

const router = Router();


router.get("/", async (req: any, res: any) => { 
  try {
    const grns = await prisma.gRN.findMany({
      orderBy: { date: "desc", },
      include: { 
        material: true,
        issueItems: true
      },
    });
    res.status(200).json(grns);
  } catch (error) {
    console.error("Error fetching GRNs:", error);
    res.status(500).json({ error: "Failed to fetch GRNs" });
  }
});


router.get("/:id", async (req: any, res: any) => { 
  const { id } = req.params;
  try {
    const grns = await prisma.gRN.findUnique({
      where: { id: id },
      include: { material: true },
    });
    res.status(200).json(grns);
  } catch (error) {
    console.error(`Error fetching GRNs: ${id}`, error);
    res.status(500).json({ error: "Failed to fetch GRNs" });
  }
});

router.post("/", async (req: any, res: any) => {
  const body = req.body;
  console.log("Received GRN data:", body);
  try {

    // Find number of rows in the GRN table
    const grnNumber = String(await prisma.gRN.count() + 1);
    const date = new Date();
    const grn = {...body, grnNumber, date}
    const newGRN = await prisma.gRN.create({
      data: grn,
    });
    res.status(201).json(newGRN);
  } catch (error) {
    console.error("Error adding GRN:", error);
    res.status(500).json({ error: "Failed to add material" });
  }
});

export default router;