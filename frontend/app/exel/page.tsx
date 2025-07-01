"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import api from "@/app/axios";

const ExcelImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setSuccess(false);
    if (selected) parseExcel(selected);
  };

  const parseExcel = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      setRows(parsed);
    };
    reader.readAsArrayBuffer(file);
  };

  const validateRow = (row: any, index: number): string | null => {
    if (!row.MaterialID || !row.Quantity || !row.Rate || !row.SupplierName) {
      return `Row ${index + 2}: Missing required fields.`;
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationErrors = rows
      .map((row, i) => validateRow(row, i))
      .filter((msg) => msg !== null) as string[];

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setUploading(true);
      await api.post("/grns/bulk-import", { grns: rows });
      setSuccess(true);
      setErrors([]);
    } catch (err) {
      setErrors(["Upload failed. Please try again."]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📂 Excel Import Wizard</h1>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="mb-4 file:bg-blue-500 file:text-white file:rounded file:px-4 file:py-2 file:cursor-pointer"
        />

        {rows.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-[#2d2d37]">
                <thead className="bg-[#23232b]">
                  <tr>
                    {Object.keys(rows[0]).map((key) => (
                      <th key={key} className="p-2 border border-[#2d2d37]">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="bg-[#1f1f27]">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="p-2 border border-[#2d2d37]">
                          {val as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="text-red-500 mb-4 space-y-1">
            {errors.map((err, i) => (
              <div key={i}>⚠ {err}</div>
            ))}
          </div>
        )}

        <button
          disabled={uploading || rows.length === 0}
          onClick={handleSubmit}
          className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-6 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Import GRNs"}
        </button>

        {success && <p className="text-green-400 mt-4">✅ Import successful!</p>}
      </div>
    </div>
  );
};

export default ExcelImportPage;
