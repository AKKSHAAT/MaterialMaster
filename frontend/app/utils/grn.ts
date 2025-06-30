import { GRN } from "../grn/[id]/page"

export const getUsedQty = (grns: GRN[]) => {
    if (!grns.issueItems || grns.issueItems.length === 0) return 0;
    const usedQty = grns.issueItems.reduce((sum: number, issueItem: any) => sum + issueItem.quantity, 0);
    return usedQty;
}
