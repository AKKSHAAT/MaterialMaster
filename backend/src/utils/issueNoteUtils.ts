import prisma from "../prisma";
import { GRN, IssueItem, Material } from "@prisma/client";

interface GetGRNParams {
  order?: "asc" | "desc";
  materialID?: string;
}

export async function getGRN({ order = "asc", materialID }: GetGRNParams) {
  const GRNs = await prisma.gRN.findMany({
    where: { materialId: materialID },
    orderBy: { date: order },
    include: {
      material: true,
      issueItems: true,
    },
  });
  return GRNs;
}

export async function generateIssueItems({
  requiredQty,
  GRNs,
}: {
  requiredQty: number;
  GRNs: (GRN & { material: Material; issueItems: IssueItem[] })[];
}) {
  const issueItems: Omit<IssueItem, "id" | "issueNoteId">[] = [];
  let remaining = requiredQty;
  let totalAmount = 0;

  for (const grn of GRNs) {
    const usedQty = grn.issueItems.reduce((sum, i) => sum + i.quantity, 0);
    const availableQty = grn.quantity - usedQty;

    if (availableQty <= 0) continue; // ⛔ skip this GRN — no stock left

    const qtyToUse = Math.min(availableQty, remaining);

    issueItems.push({
      grnId: grn.id,
      quantity: qtyToUse,
      rate: grn.rate,
      amount: qtyToUse * grn.rate,
    });

    totalAmount += qtyToUse * grn.rate;
    remaining -= qtyToUse;

    if (remaining <= 0) break;
  }

  if (remaining > 0) {
    throw new Error("Not enough stock to fulfill request");
  }

  return {
    issueItems,
    totalAmount,
    weightedRate: totalAmount / requiredQty,
  };
}

export async function generateUniqueIssueNumber() {
  // Get current year
  const year = new Date().getFullYear();

  // Get the latest issue note (by issueNumber, desc)
  const latest = await prisma.issueNote.findFirst({
    where: {
      issueNumber: {
        startsWith: `ISN/${year}/`,
      },
    },
    orderBy: {
      issueNumber: "desc",
    },
  });

  let nextNumber = 1;

  if (latest) {
    const parts = latest.issueNumber.split("/");
    const lastNum = parseInt(parts[2]);
    nextNumber = lastNum + 1;
  }

  // Pad to 3 digits
  const padded = String(nextNumber).padStart(3, "0");

  return `ISN/${year}/${padded}`;
}

export async function generateIssueNote({
  materialId,
  quantity,
  issuedTo,
  approvedBy,
  purpose,
}: {
  materialId: string;
  quantity: number;
  issuedTo: string;
  approvedBy: string;
  purpose?: string;
}) {
  const GRNs = await getGRN({ materialID: materialId });
    const { issueItems, totalAmount, weightedRate } = await generateIssueItems({
    requiredQty: quantity,
    GRNs,
  });
  const issueNumber = await generateUniqueIssueNumber();
  // Return the data needed to create the issue note, but do not create it here
  return {
    issueNumber,
    date: new Date(),
    materialId,
    totalQuantity: quantity,
    weightedRate,
    totalAmount,
    issuedTo,
    approvedBy,
    purpose,
    issueItems,
  };
}
