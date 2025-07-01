"use client";
import React, { useEffect, useState, useRef } from "react";
import EditButton from "@/app/components/EditButton";
import api from "@/app/axios";
import { getMaterials } from "@/app/apis";
import { useRouter } from "next/navigation";

export interface Material {
  id: string;
  name: string;
  unit: string;
}

const page = () => {
  const [issueNote, setIssueNote] = useState({
    materialId: "",
    totalQuantity: 0,
    totalAmount: 0,
    issuedTo: "",
    purpose: "",
    approvedBy: "",
  });
  const [material, setMaterial] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [estimate, setEstimate] = useState<any>(null);
  const [gettingEstimate, setGettingEstimate] = useState<boolean>(false);
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  // Debounced estimate effect
  useEffect(() => {
    if (!issueNote.materialId || !issueNote.totalQuantity) {
      setEstimate(null);
      return;
    }
    setGettingEstimate(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const est = await api.post("/issue-notes/estimate", issueNote);
        setEstimate(est);
        console.log(est, "💰💰");
      } catch (error) {
        console.log(error);
      } finally {
        setGettingEstimate(false);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    issueNote.materialId,
    issueNote.totalQuantity,
    issueNote.issuedTo,
    issueNote.purpose,
    issueNote.approvedBy,
  ]);

  const sendIssueNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const createIssueNote = await api.post("/issue-notes", issueNote);
      if (createIssueNote) router.push("/issue-notes");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-[80vw] mx-auto">
        <div className="flex justify-between gap-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add a new Issue Note</h1>
          <EditButton link="issue-notes/add" text="New" />
        </div>
        <form className="mx-auto flex flex-col gap-4 max-w-3xl">
          <section className="w-full flex flex-row gap-8">
            <div className="w-1/2 flex flex-col gap-2">
              <label className="flex flex-col">
                <span className="mb-1">Material</span>
                <select
                  value={issueNote.materialId}
                  onChange={(e) =>
                    setIssueNote((prev) => ({
                      ...prev,
                      materialId: e.target.value,
                    }))
                  }
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
                <span className="mb-1">Total Quantity</span>
                <input
                  type="number"
                  value={issueNote.totalQuantity}
                  onChange={(e) => {
                    setIssueNote((prev) => ({
                      ...prev,
                      totalQuantity: Number(e.target.value) || 0,
                    }));
                  }}
                  placeholder="Total Quantity"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                  min={0}
                  step="any"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Total Amount</span>
                <p className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white opacity-70 min-h-[41px]">
                  {estimate &&
                    (gettingEstimate
                      ? "Calculating..."
                      : `₹ ${estimate.totalAmount}`)}
                </p>
              </label>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label className="flex flex-col">
                <span className="mb-1">Issued To</span>
                <input
                  type="text"
                  value={issueNote.issuedTo}
                  onChange={(e) =>
                    setIssueNote((prev) => ({
                      ...prev,
                      issuedTo: e.target.value,
                    }))
                  }
                  placeholder="Issued To"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Purpose</span>
                <input
                  type="text"
                  value={issueNote.purpose}
                  onChange={(e) =>
                    setIssueNote((prev) => ({
                      ...prev,
                      purpose: e.target.value,
                    }))
                  }
                  placeholder="Purpose (optional)"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Approved By</span>
                <input
                  type="text"
                  value={issueNote.approvedBy}
                  onChange={(e) =>
                    setIssueNote((prev) => ({
                      ...prev,
                      approvedBy: e.target.value,
                    }))
                  }
                  placeholder="Approved By"
                  className="w-full border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
                />
              </label>
            </div>
          </section>
          <button
            type="button"
            onClick={sendIssueNote}
            className="w-full md:w-[368px] bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Generate Issue Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
