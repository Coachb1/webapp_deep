"use client";

import { MILESTONES } from "@/hooks/useReadingProgress";

interface ReadingProgressBarProps {
  percent: number;
}


export default function ReadingProgressBar({ percent }: ReadingProgressBarProps) {
  return (
    <div className="absolute bottom-3 left-0 w-full flex justify-center z-30 pointer-events-none">
      
      {/* Container */}
      <div className="relative w-[92%] max-w-4xl">

        {/* Progress bar background */}
        <div className="h-2 bg-[#E6F7F2] rounded-full shadow-inner overflow-hidden">
          <div
            className="h-2 transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: "#2DC092",
            }}
          />
        </div>

        {/* Milestone dots */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2 px-1">
          {MILESTONES.map((m) => (
            <div
              key={m}
              className={`w-3 h-3 rounded-full border shadow-sm ${
                percent >= m
                  ? "bg-[#2DC092] border-[#2DC092]"
                  : "bg-white border-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}