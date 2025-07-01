"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Material {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
}

const PieChart = ({ materials }: { materials: Material[] }) => {
  const data = {
    labels: materials.map((mat) => mat.name),
    datasets: [
      {
        label: "Quantity",
        data: materials.map((mat) => mat.quantity),
        backgroundColor: [
          "#60a5fa", // blue-400
          "#f87171", // red-400
          "#34d399", // green-400
          "#fbbf24", // yellow-400
          "#a78bfa", // purple-400
          "#f472b6", // pink-400
          "#38bdf8", // sky-400
          "#facc15", // amber-400
        ],
        borderColor: "#23232b",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-[#23232b] border border-[#2d2d37] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">
        Material Quantity Distribution
      </h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
