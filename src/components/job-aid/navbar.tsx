"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/books/ui/buttonn";
import { usePathname } from "next/navigation";


const Navbar: React.FC<{ clientId?: string }> = ({ clientId }) => {
  const pathname = usePathname();
  // 🚫 Hide Navbar on /portal/simReport
  if (pathname === "/portal/simReport") {
    return null;
  }
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <h1 className="w-fit border-2 border-[#2DC092] px-2 py-1 text-lg font-extrabold text-[#2DC092] sm:text-xl">
              <span className="mr-1 bg-[#2DC092] px-2 py-1 text-base font-bold text-white sm:text-lg">
                COACH
              </span>
              BOT
            </h1>
          {pathname.includes("portal") && clientId && (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
              {/* Leader Board Button */}
              <Button
                onClick={() => {
                    const url = `/portal/simReport/?client_id=${clientId}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  
                }}
                className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
              >
                Report
              </Button>

            </div>
           )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
