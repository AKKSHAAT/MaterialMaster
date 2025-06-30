'use client'
import React from 'react'
import { useRouter } from 'next/navigation';


const SmallTable = ({heads, rows}: {heads: string[], rows: any[]}) => {
  const router = useRouter();
  return (
    <table className="min-w-full text-sm">
        <thead>
            <tr className="bg-[#1a1a22]">
            {heads.map((headding)=> (
                <th className="px-4 py-2 text-left">{headding}</th>

            ))}
            </tr>
        </thead>
        <tbody>
            {rows?.map((item: any) => (
            <tr key={item.id} className="border-b border-[#2d2d37] cursor-pointer" onClick={() => router.push(`/grn/${item.grnId}`)}>
                <td className="px-4 py-2 font-mono">{item.grnId}</td>
                <td className="px-4 py-2 font-mono">{item.quantity}</td>
                <td className="px-4 py-2 font-mono">{item.rate}</td>
                <td className="px-4 py-2 font-mono">{item.amount}</td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default SmallTable