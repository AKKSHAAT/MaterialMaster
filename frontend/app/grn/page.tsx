"use client";
import React, { useState } from "react";

const page = () => {
  const [grn, setGrn] = useState({
    materialId: "",
    quantity: 0,
    rate: 0,
    totalAmount: 0,
    supplierName: "",
    receivedBy: "",
    remarks: "",
  });

  // Optionally, auto-calculate totalAmount
  const handleQuantityOrRateChange = (
    field: "quantity" | "rate",
    value: number
  ) => {
    const updated = { ...grn, [field]: value };
    updated.totalAmount = updated.quantity * updated.rate;
    setGrn(updated);
  };

  const sendGRN = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Implement API call to submit GRN
    console.log(grn);
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-[80vw] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add a new GRN</h1>
        <form className="mx-auto flex flex-col gap-4 max-w-3xl">
          <section className="w-full flex flex-row gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <label className="flex flex-col">
                <span className="mb-1">Material ID</span>
                <input
                  type="text"
                  value={grn.materialId}
                  onChange={(e) =>
                    setGrn((prev) => ({ ...prev, materialId: e.target.value }))
                  }
                  placeholder="Material ID"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Quantity</span>
                <input
                  type="number"
                  value={grn.quantity}
                  onChange={(e) =>
                    handleQuantityOrRateChange(
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  placeholder="Quantity"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                  min={0}
                  step="any"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Rate</span>
                <input
                  type="number"
                  value={grn.rate}
                  onChange={(e) =>
                    handleQuantityOrRateChange("rate", Number(e.target.value))
                  }
                  placeholder="Rate"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                  min={0}
                  step="any"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Total Amount</span>
                <input
                  type="number"
                  value={grn.totalAmount}
                  readOnly
                  placeholder="Total Amount"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white opacity-70"
                />
              </label>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label className="flex flex-col">
                <span className="mb-1">Supplier Name</span>
                <input
                  type="text"
                  value={grn.supplierName}
                  onChange={(e) =>
                    setGrn((prev) => ({
                      ...prev,
                      supplierName: e.target.value,
                    }))
                  }
                  placeholder="Supplier Name"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Received By</span>
                <input
                  type="text"
                  value={grn.receivedBy}
                  onChange={(e) =>
                    setGrn((prev) => ({ ...prev, receivedBy: e.target.value }))
                  }
                  placeholder="Received By"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Remarks</span>
                <input
                  type="text"
                  value={grn.remarks}
                  onChange={(e) =>
                    setGrn((prev) => ({ ...prev, remarks: e.target.value }))
                  }
                  placeholder="Remarks (optional)"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
            </div>
          </section>
          <button
            type="button"
            onClick={sendGRN}
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Generate GRN
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
