"use client";

import React from "react";

interface WelcomePageProps {
  onStart: () => void;
  loading: boolean;
  title: string;
  description: string;
}


const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, loading, title, description }) => {
  const isContentLoaded = Boolean(title && description);
  const isDisabled = loading || !isContentLoaded;

  if (!isContentLoaded) {
    return (
      // <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      // <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#00c193]">
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-[#00c193]"></div>
      </div>

      // </div>
    );
  }

  return (
    <div className="bg-transparent rounded-2xl shadow-none p-10 text-center max-w-4xl w-full animate-[fadeInUp_0.8s_ease-out] mt-2 mx-auto">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-[2.75rem] font-bold text-gray-800 leading-tight whitespace-normal max-w-3xl">
          {title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
          {description}
        </p>
        <button
          onClick={onStart}
          disabled={isDisabled}
          className="bg-[#00c193] text-white px-10 py-4 text-lg font-semibold 
                     cursor-pointer transition-all duration-300 
                     shadow-[0_10px_30px_rgba(186,255,236,0.3)] min-w-[200px] 
                     disabled:opacity-70 disabled:cursor-not-allowed
                     hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(226,237,231,0.4)] 
                     active:translate-y-0"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
