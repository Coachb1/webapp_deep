"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/books/ui/buttonn";
import { usePathname } from "next/navigation";


const Navbar: React.FC = () => {
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
          <Image
            src="/images/coachbotlogo.png"
            alt="CoachBot Logo"
            width={180}
            height={180}
            className="w-44 h-44 md:w-44 md:h-44 object-contain"
          />
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            {/* Leader Board Button */}
            <Button
              onClick={() => {
                
                  const url = `/portal/simReport`;
                  window.open(url, "_blank", "noopener,noreferrer");
                
              }}
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
            >
              Report
            </Button>

          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
