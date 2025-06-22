import React from 'react'
import api from '../axios'
import EditButton from '../components/EditButton';

const page = async () => {
    const meterials = await api.get('/materials');
    console.log(meterials.data);
    if (!meterials.data || meterials.data.length === 0) {
        return (
            <div className="min-h-screen bg-[#18181b] text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">No Materials Found</h1>
                    <p className="text-gray-400">Please add some materials.</p>
                </div>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between gap-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Materials</h1>
            <EditButton link="materials/add" text="New"/>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-[#23232b] border border-[#2d2d37]">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">id</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">name</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">unit</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">category</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">minStockLevel</th>
              </tr>
            </thead>
            <tbody>
                {meterials.data.map((material: any, i: number) => (
                    <tr key={`table-row-${i}`} className="hover:bg-[#282834] transition">
                        <td className="px-6 py-4 border-b border-[#2d2d37] font-mono">{i+1}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{material.name || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{material.unit || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{material.category || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{material.minStockLevel || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page