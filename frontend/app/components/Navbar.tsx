'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="fixed top-[1.7rem] left-4 z-50 p-2 rounded focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>
      {/* Sidebar Navbar */}
      <nav
        className={`h-screen w-64 bg-[#18181b] text-white flex flex-col py-8 px-4 shadow-lg border-r border-[#2d2d37] fixed top-0 left-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 ${
          open ? "hidden" : "block"
        }`}
      >
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
    </>
  );
};

export default Navbar;
