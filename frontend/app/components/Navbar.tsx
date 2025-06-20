import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-screen w-64 bg-[#18181b] text-white flex flex-col py-8 px-4 shadow-lg border-r border-[#2d2d37]">
      <h2 className="text-xl font-bold mb-10 tracking-wide text-center">
        Material Master
      </h2>
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            href="/"
            className="block px-4 py-2 rounded hover:bg-[#23232b] transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/materials"
            className="block px-4 py-2 rounded hover:bg-[#23232b] transition-colors"
          >
            Material Management
          </Link>
        </li>
        <li>
          <Link
            href="/grn"
            className="block px-4 py-2 rounded hover:bg-[#23232b] transition-colors"
          >
            GRN Management
          </Link>
        </li>
        <li>
          <Link
            href="/issue-notes"
            className="block px-4 py-2 rounded hover:bg-[#23232b] transition-colors"
          >
            Issue Notes
          </Link>
        </li>
        <li>
          <Link
            href="/stock-reports"
            className="block px-4 py-2 rounded hover:bg-[#23232b] transition-colors"
          >
            Stock Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
