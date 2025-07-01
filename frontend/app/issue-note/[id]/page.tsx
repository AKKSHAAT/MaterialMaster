import api from "@/app/axios";
import React from "react";

interface IssueItem {
  id: string;
  grnId: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Material {
  id: string;
  name: string;
  unit: string;
  category: string;
}

export interface IssueNote {
  id: string;
  issueNumber: string;
  date: string;
  materialId: string;
  totalQuantity: number;
  weightedRate: number;
  totalAmount: number;
  issuedTo: string;
  approvedBy: string;
  purpose?: string;
  material: Material;
  issueItems: IssueItem[];
}

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const issueNote: IssueNote = await api.get(`/issue-notes/${id}`);

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-2xl mx-auto bg-[#23232b] rounded-lg shadow p-8 border border-[#2d2d37]">
        <h1 className="text-2xl font-bold mb-6">Issue Note</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-gray-400">Issue Number</div>
            <div className="font-mono text-lg">{issueNote.issueNumber}</div>
          </div>
          <div>
            <div className="text-gray-400">Date</div>
            <div className="font-mono text-lg">{new Date(issueNote.date).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Material</div>
            <div className="font-mono text-lg">{issueNote.material?.name || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-400">Unit</div>
            <div className="font-mono text-lg">{`${issueNote.material?.unit}(s)` || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-400">Category</div>
            <div className="font-mono text-lg">{issueNote.material?.category || "N/A"}</div>
          </div>
          <div>
            <div className="text-gray-400">Total Quantity</div>
            <div className="font-mono text-lg">{issueNote.totalQuantity}</div>
          </div>
          <div>
            <div className="text-gray-400">Weighted Rate</div>
            <div className="font-mono text-lg">{issueNote.weightedRate}</div>
          </div>
          <div>
            <div className="text-gray-400">Total Amount</div>
            <div className="font-mono text-lg">{issueNote.totalAmount}</div>
          </div>
          <div>
            <div className="text-gray-400">Issued To</div>
            <div className="font-mono text-lg">{issueNote.issuedTo}</div>
          </div>
          <div>
            <div className="text-gray-400">Approved By</div>
            <div className="font-mono text-lg">{issueNote.approvedBy}</div>
          </div>
          <div>
            <div className="text-gray-400">Purpose</div>
            <div className="font-mono text-lg">{issueNote.purpose || "N/A"}</div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-6">Issue Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a22]">
                <th className="px-4 py-2 text-left">GRN ID</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Rate</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {issueNote.issueItems?.map((item) => (
                <tr key={item.id} className="border-b border-[#2d2d37]">
                  <td className="px-4 py-2 font-mono">{item.grnId}</td>
                  <td className="px-4 py-2 font-mono">{item.quantity}</td>
                  <td className="px-4 py-2 font-mono">{item.rate}</td>
                  <td className="px-4 py-2 font-mono">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
