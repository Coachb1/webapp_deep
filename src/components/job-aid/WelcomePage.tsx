"use client";

import React from "react";

interface WelcomePageProps {
  onStart: () => void;
  loading: boolean;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, loading }) => {
  return (
    <div className="bg-transparent rounded-2xl shadow-none p-10 text-center max-w-xl w-full animate-[fadeInUp_0.8s_ease-out] mt-24 mx-auto">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-[2.2rem] font-bold text-gray-800 leading-tight mb-2 truncate">
          Welcome to your Management Action Planner
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-md">
          This interactive tool will help you plan and organize your management
          actions through a series of thoughtful questions.
        </p>
        <button
          onClick={onStart}
          disabled={loading}
          className="bg-[#00c193] text-white px-10 py-4 text-lg font-semibold 
                     cursor-pointer transition-all duration-300 
                     shadow-[0_10px_30px_rgba(186,255,236,0.3)] min-w-[200px] 
                     rounded-full disabled:opacity-70 disabled:cursor-not-allowed
                     hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(226,237,231,0.4)] 
                     active:translate-y-0"
        >
          {loading ? "Loading..." : "Start"}
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
