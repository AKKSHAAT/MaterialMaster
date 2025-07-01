import React from "react";
import api from "./axios";
import SmallTable from "./components/Dashboard/SmallTable";
import LargeTable from "./components/Dashboard/LargeTable";
import PieChart from "./components/Dashboard/PieChart";
interface Material {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  unit: string;
}

const page = async () => {
  const response = await api.get("/grn/qty");
  const materials: Material[] = response;
  console.log(materials, "💥💥");

  const belowMinMaterials = materials.filter(
    (mat) => mat.quantity < mat.minQuantity
  );
  const zeroQty = materials.filter(
    (mat) => mat.quantity <= 0
  );

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8 pb-20">
      <div className="max-w-[80vw] mx-auto">
        <h2 className="text-2xl font-bold mb-6">Materials Dashboard</h2>
        <section className="mb-8 flex flex-col md:flex-row gap-2 items-start justify-center">
          <LargeTable materials={materials} />
          <div className="felx flex-col gap-4 min-h-full">
            <SmallTable heading={"Materials Below Minimum Quantity"} belowMinMaterials={belowMinMaterials} />
            <div className="mt-6">
              <SmallTable heading={"No stock left"} belowMinMaterials={zeroQty} />
            </div>
          </div>
          <PieChart materials={materials}/>
        </section>
      </div>
    </div>
  );
};

export default page;
