"use client";
import { useState } from "react";
import api from "../../axios";
import { AxiosError } from "axios";

const page = () => {
  const [material, setMaterial] = useState({
    name: "",
    unit: "",
    category: "",
    minStockLevel: 0,
  });

  const sendMaterial: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const saved = await api.post("/materials", material);
      console.log(saved);
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data || error?.message || error);
      throw new Error("Failed to add material");
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add a new Material</h1>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <label className="flex flex-col">
            <span className="mb-1">Material Name</span>
            <input
              type="text"
              onChange={(e) =>
                setMaterial((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Cement, Steel rods, PVC pipes, etc."
              className="border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Unit</span>
            <input
              type="text"
              onChange={(e) =>
                setMaterial((prev) => ({ ...prev, unit: e.target.value }))
              }
              placeholder="Kg, L, m3, etc"
              className="border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Category</span>
            <input
              type="text"
              onChange={(e) =>
                setMaterial((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="Wood, Metal, Plastic"
              className="border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1">Minimum Stock Level</span>
            <input
              type="number"
              onChange={(e) =>
                setMaterial((prev) => ({
                  ...prev,
                  minStockLevel: Number(e.target.value),
                }))
              }
              placeholder="10, 20, 50"
              className="border border-[#2d2d37] rounded-md p-2 bg-[#23232b] text-white"
            />
          </label>
          <button
            type="button"
            onClick={sendMaterial}
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
