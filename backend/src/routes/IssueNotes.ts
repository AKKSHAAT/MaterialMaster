import { Router } from "express";
import prisma from "../prisma";
import { Request, Response } from "express";
import { generateIssueNote } from "../utils/issueNoteUtils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const issueNotes = await prisma.issueNote.findMany({
      orderBy: { date: "desc" },
      include: { issueItems: true, material: true },
    });
    res.status(200).json(issueNotes);
  } catch (error) {
    console.error("Error fetching issue notes:", error);
    res.status(500).json({ error: "Failed to fetch issue notes" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const issueNote = await prisma.issueNote.findFirst({
      where: { id: id },
      include: {
        issueItems: true,
        material: true,
      },
    });
    res.status(200).json(issueNote);
  } catch (error) {
    console.error("Error fetching issue notes:", error);
    res.status(500).json({ error: "Failed to fetch issue notes" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { materialId, totalQuantity, issuedTo, purpose, approvedBy } =
      req.body;
    // Get the data to create the issue note
    const issueNoteData = await generateIssueNote({
      materialId,
      quantity: totalQuantity,
      issuedTo,
      approvedBy,
      purpose,
    });
    // Actually create the entry in the database
    const createdIssueNote = await prisma.issueNote.create({
      data: {
        ...issueNoteData,
        issueItems: {
          create: issueNoteData.issueItems,
        },
      },
      include: {
        issueItems: true,
        material: true,
      },
    });
    console.log("Created issue note📝:", createdIssueNote);
    res.status(201).json(createdIssueNote);
  } catch (error) {
    console.error("Error creating issue note:", error);
    res.status(500).json({ error: "Failed to create issue note" });
  }
});

// Cost estimation route (does not create entry)
router.post("/estimate", async (req: Request, res: Response) => {
  try {
    const { materialId, totalQuantity, issuedTo, purpose, approvedBy } =
      req.body;
    const estimate = await generateIssueNote({
      materialId,
      quantity: totalQuantity,
      issuedTo,
      approvedBy,
      purpose,
    });
    res.status(200).json(estimate);
  } catch (error) {
    console.error("Error estimating issue note:", error);
    res.status(500).json({ error: "Failed to estimate issue note" });
  }
});

export default router;
