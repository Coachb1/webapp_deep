"use client";

import Image from "next/image";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Image
            src="/images/coachbotlogo.png"
            alt="CoachBot Logo"
            width={120}
            height={120}
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
