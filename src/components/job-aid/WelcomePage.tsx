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
        <h1 className="custom-title text-4xl md:text-[2.75rem] font-bold text-gray-800 leading-tight whitespace-normal max-w-3xl">
          {title}
        </h1>
        <p className="custom-subtitle text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
          {description}
        </p>
        <button
          onClick={onStart}
          disabled={isDisabled}
          className="custom-btn btn-md bg-white border border-[#00c193] text-black px-10 py-4 text-lg font-semibold 
                     cursor-pointer transition-all duration-300 
                     shadow-sm
                     disabled:opacity-70 disabled:cursor-not-allowed
                     hover:bg-gray-300
                     active:translate-y-0"
                    style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
