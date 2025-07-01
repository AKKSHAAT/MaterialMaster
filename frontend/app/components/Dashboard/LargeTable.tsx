import React from 'react'

const LargeTable = ({materials} : {materials: any[]}) => {
  return (
    <div className="flex-1 overflow-x-auto rounded-lg shadow mb-8 bg-[#23232b] border border-[#2d2d37]">
        <h3 className="text-xl font-semibold mb-4 text-blue-400 p-6">
            All Materials
        </h3>
        <table className="min-w-full">
            <thead>
            <tr>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                Name
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                Remaining Quantity
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                Minimum Quantity
                </th>
            </tr>
            </thead>
            <tbody>
            {materials.map((mat) => (
                <tr key={mat.id} className="hover:bg-[#282834] transition">
                <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {mat.name}
                </td>
                <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {mat.quantity}
                </td>
                <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {mat.minQuantity}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default LargeTable