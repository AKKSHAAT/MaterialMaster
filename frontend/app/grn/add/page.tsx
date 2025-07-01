"use client";
import React, { useEffect, useState } from "react";
import EditButton from "@/app/components/EditButton";
import api from "@/app/axios";
import { getMaterials } from "@/app/apis";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";

export interface Material {
  id: string;
  name: string;
  unit: string;
}
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
  const [material, setMaterial] = useState<Material[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMaterials() {
      try {
        setLoading(true);
        const response = await getMaterials();
        setMaterial(response);
        console.log(response, "✏️✏️");
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, []);
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
    const createGRN = await api.post("/grn", grn);
    if (createGRN) {
      router.push('/grn');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-[80vw] mx-auto">
        <div className="flex justify-between gap-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add a new GRN</h1>
          <EditButton link="grn/add" text="New" />
          
        </div>
        <form className="mx-auto flex flex-col gap-4 max-w-3xl">
          <section className="w-full flex flex-row gap-8">
            <div className="w-1/2 flex flex-col gap-2">
              <label className="flex flex-col">
                <span className="mb-1">Material</span>
                <select
                  value={grn.materialId}
                  onChange={(e) =>{
                    setGrn((prev) => ({ ...prev, materialId: e.target.value }))
                    const m = material.find(
                      (mat) => mat.id === e.target.value
                    );
                    setSelectedUnit(m ? m.unit : "");
                  }}
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                >
                  <option value="" disabled>
                    Select Material
                  </option>
                  {material.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Quantity {selectedUnit && selectedUnit + '(s)'}</span>
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
            className="w-full md:w-[368px] bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Generate GRN
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
