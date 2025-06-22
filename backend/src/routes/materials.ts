import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();



router.get("/", async (req: Request, res: Response) => {
  try {
    const materials = await prisma.material.findMany();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
})
router.post("/", async (req: any, res: any) => {
  const materialData = req.body;
  console.log("Received material data:", materialData);
  try {
    const existingMaterial = await prisma.material.findFirst({
        where: {
          name: materialData.name,
        },
    })
    if (existingMaterial) {
      console.log("Material already exists:", existingMaterial);
      return res.status(400).json({ error: "Material with this name already exists" });
    }
    const newMaterial = await prisma.material.create({
      data: materialData,
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error("Error adding material:", error);
    res.status(500).json({ error: "Failed to add material" });
  }
});


export default router;