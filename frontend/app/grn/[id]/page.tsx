import api from "@/app/axios";
import React from "react";

interface Material {
  id: string;
  name: string;
  unit: string;
  category: string;
  minStockLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface GRN {
  id: string;
  grnNumber: string;
  date: string;
  materialId: string;
  quantity: number;
  rate: number;
  totalAmount: number;
  supplierName: string;
  invoiceRef: string | null;
  receivedBy: string;
  remarks: string;
  material: Material;
  issueItems: any[];
}

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const grn : GRN  = await api.get(`/grn/${id}`);
  

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-2xl mx-auto bg-[#23232b] rounded-lg shadow p-8 border border-[#2d2d37]">
        <h1 className="text-2xl font-bold mb-6">Goods Received Note (GRN)</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-gray-400">GRN Number</div>
            <div className="font-mono text-lg">{grn.grnNumber}</div>
          </div>
          <div>
            <div className="text-gray-400">Date</div>
            <div className="font-mono text-lg">
              {new Date(grn.date).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Material</div>
            <div className="font-mono text-lg">
              {grn.material?.name || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Unit</div>
            <div className="font-mono text-lg">
              {`${grn.material?.unit}(s)` || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Category</div>
            <div className="font-mono text-lg">
              {grn.material?.category || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Quantity</div>
            <div className="font-mono text-lg">{grn.quantity}</div>
          </div>
          <div>
            <div className="text-gray-400">Rate</div>
            <div className="font-mono text-lg">{grn.rate}</div>
          </div>
          <div>
            <div className="text-gray-400">Total Amount</div>
            <div className="font-mono text-lg">{grn.totalAmount}</div>
          </div>
          <div>
            <div className="text-gray-400">Supplier Name</div>
            <div className="font-mono text-lg">{grn.supplierName}</div>
          </div>
          <div>
            <div className="text-gray-400">Invoice Ref</div>
            <div className="font-mono text-lg">{grn.invoiceRef || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-400">Received By</div>
            <div className="font-mono text-lg">{grn.receivedBy}</div>
          </div>
          <div>
            <div className="text-gray-400">Remarks</div>
            <div className="font-mono text-lg">{grn.remarks || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
