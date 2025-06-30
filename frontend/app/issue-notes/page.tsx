"use client";
import React, { useEffect, useState } from "react";
import api from "../axios";
import EditButton from "../components/EditButton";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const Page = () => {
  const [issueNotes, setIssueNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchIssueNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/issue-notes");
        setIssueNotes(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIssueNotes();
  }, []);


  if (loading) {
    return <Loader />;
  }
  if (!issueNotes || issueNotes.length === 0) {
    return (
      <div className="min-h-screen bg-[#18181b] text-white p-8">
        <div className="flex justify-between gap-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Issue Notes</h1>
          <EditButton link="issue-notes/add" text="New" />
        </div>
        <p className="mx-auto text-gray-400">Please add some Issue Notes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8">
      <div className="max-w-[80vw] mx-auto">
        <div className="flex justify-between gap-4 max-w-full mx-auto">
          <h1 className="text-2xl font-bold mb-6">Issue Notes</h1>
          <EditButton link="issue-notes/add" text="New" />
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-[#23232b] border border-[#2d2d37]">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Issue #
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Date
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Material
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Total Quantity
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Weighted Rate
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Total Amount
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Issued To
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Purpose
                </th>
                <th className="px-6 py-3 border-b border-[#2d2d37] text-left font-semibold">
                  Approved By
                </th>
              </tr>
            </thead>
            <tbody>
              {issueNotes.map((note: any, i: number) => (
                <tr
                  key={`table-row-${i}`}
                  className="hover:bg-[#282834] transition"
                  onClick={() => router.push(`/issue-notes/${note.id}`)}
                >
                  <td className="px-6 py-4 border-b border-[#2d2d37] font-mono">
                    {note.issueNumber}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {new Date(note.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.material.name}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.totalQuantity}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.weightedRate}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.totalAmount}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.issuedTo}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.purpose || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b border-[#2d2d37]">
                    {note.approvedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
