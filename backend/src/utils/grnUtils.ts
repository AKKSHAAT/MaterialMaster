import { GRN, Material, IssueItem } from "@prisma/client";
import { prisma } from "../prisma";

export const getStockQty = async () => {
  const GRNs = await prisma.gRN.findMany({
    include: { issueItems: true, material: true },
  });
  
  const stockMap: Record<string, any> = {};
  GRNs.forEach((grn: GRN & { material: Material; issueItems: IssueItem[] }) => {
    const totalIssued = grn.issueItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const qty = grn.quantity - totalIssued;

    if (stockMap[grn.materialId]) {
      stockMap[grn.materialId].quantity += qty;
    } else {
      stockMap[grn.materialId] = {
        materialId: grn.materialId,
        name: grn.material.name,
        unit: grn.material.unit,
        minQuantity: grn.material.minStockLevel,
        quantity: qty,
      };
    }
  });
  const stockQty = Object.values(stockMap);
  console.log("Stock Quantity (aggregated):", stockQty);
  return stockQty;
};
