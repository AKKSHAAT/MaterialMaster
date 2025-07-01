'use client'
import React, {useState, useEffect} from 'react'
import api from '../axios'
import EditButton from '../components/EditButton';
import { useRouter } from 'next/navigation';
import { getUsedQty } from '../utils/grn';
import Loader from '../components/Loader';
import UploadBtn from '../components/Dashboard/UploadBtn';

const page = () => { 
    const [grns, setGrns] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      const fetchGrns = async () => {
        try {
          setLoading(true);
          const response = await api.get('/grn');
          setGrns(response);
          console.log(response);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchGrns();
    }, []);

    if (loading) {
      return <Loader />
    }
  
    if (!grns || grns.length === 0) {
        return (
            <div className="min-h-screen bg-[#18181b] text-white p-8">
                <div className="flex justify-between gap-4 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">GRNs</h1>
                    <EditButton link="materials/add" text="New"/>
                    <UploadBtn link="/exel" text="Upload form Exel" />
                </div>
                <p className="mx-auto text-gray-400">Please add some GRNs.</p>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between gap-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">GRNs</h1>
            <div className='flex justify-end gap-2'>
              <EditButton link="grn/add" text="New"/>
              <UploadBtn link="/exel" text="Upload form Exel" />
            </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-[#23232b] border border-[#2d2d37]">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">No.</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Material</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Rate</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Amount</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Supplier</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Quantity</th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">Quantity Used</th>
              </tr>
            </thead>
            <tbody>
                {grns?.map((grn: any, i: number) => {
                  const usedQty = getUsedQty(grn);
                  const color = (grn.quantity - usedQty) <= grn.material.minStockLevel ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-[#282834]';
                  return (
                      <tr key={`table-row-${i}`} className={`${color} transition`} onClick={() => router.push(`/grn/${grn.id}`)}>
                        <td className="px-6 py-4 border-b border-[#2d2d37] font-mono">{grn.grnNumber}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{grn.material.name || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{grn.rate || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{grn.totalAmount || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{grn.supplierName || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{grn.quantity || 'N/A'}</td>
                        <td className="px-6 py-4 border-b border-[#2d2d37]">{usedQty}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page