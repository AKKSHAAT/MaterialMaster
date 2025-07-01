import React from "react";

const SmallTable = ({ belowMinMaterials, heading }: { belowMinMaterials: any[] , heading: string}) => {
  return (
    <div className="max-h-[244px] w-full md:w-[400px] bg-[#1a1a22] border border-[#2d2d37] rounded-lg shadow-lg p-6 top-8 flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="text-red-400"
        >
          <circle cx="10" cy="10" r="10" />
        </svg>
        {heading}
      </h3>
      {belowMinMaterials.length === 0 ? (
        <div className="text-green-400">
          All materials are above minimum quantity.
        </div>
      ) : (
        <div className="overflow-y-auto max-h-60">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-[#1a1a22] z-10">
              <tr>
                <th className="px-4 py-2 border-b border-[#2d2d37] text-left font-semibold">
                  Name
                </th>
                <th className="px-4 py-2 border-b border-[#2d2d37] text-left font-semibold">
                  Remaining
                </th>
                <th className="px-4 py-2 border-b border-[#2d2d37] text-left font-semibold">
                  Min
                </th>
              </tr>
            </thead>
            <tbody>
              {belowMinMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-[#282834] transition">
                  <td className="px-4 py-2 border-b border-[#2d2d37]">
                    {mat.name}
                  </td>
                  <td className="px-4 py-2 border-b border-[#2d2d37]">
                    {mat.quantity}
                  </td>
                  <td className="px-4 py-2 border-b border-[#2d2d37]">
                    {mat.minQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SmallTable;
