import { Router } from "express";
import prisma from "../prisma";
import { Request, Response } from "express";
import { generateIssueNote } from "../utils/issueNoteUtils";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const issueNotes = await prisma.issueNote.findMany({
      orderBy: { date: "desc" },
      include: { issueItems: true , material: true},
    });
    res.status(200).json(issueNotes);
  } catch (error) {
    console.error("Error fetching issue notes:", error);
    res.status(500).json({ error: "Failed to fetch issue notes" });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const issueNote = await prisma.issueNote.findFirst({
      where: {id: id},
      include: {
        issueItems: true,
        material: true
      }
    })
    res.status(200).json(issueNote);
  } catch (error) {
    console.error("Error fetching issue notes:", error);
    res.status(500).json({ error: "Failed to fetch issue notes" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { materialId, totalQuantity, issuedTo, purpose, approvedBy } = req.body;
    const issueNote = await generateIssueNote({materialId, quantity: totalQuantity, issuedTo, approvedBy, purpose});
    console.log("Created issue note📝:", issueNote);
    res.status(201).json(issueNote);
  } catch (error) {
    console.error("Error creating issue note:", error);
    res.status(500).json({ error: "Failed to create issue note" });
  }
})

export default router;