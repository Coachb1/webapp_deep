"use client";
import React from "react";

interface PaginationProps {
  totalSlides: number;
  currentSlide: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalSlides,
  currentSlide,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
      {/* Prev Button */}
      <button
        disabled={currentSlide === 0}
        onClick={() => onPageChange(currentSlide - 1)}
        className={`px-4 py-1.5 text-sm font-medium shadow-sm transition-all duration-300 border border-[#00c193]
        ${
          currentSlide === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
      >
        Prev
      </button>

{/* Page Numbers */}
      {Array.from({ length: totalSlides }).map((_, index) => {
        if (
          index === 0 ||
          index === totalSlides - 1 ||
          (index >= currentSlide - 1 && index <= currentSlide + 1)
        ) {
          return (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-6 h-6 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer mx-[2px] transition-all duration-300 border border-[#00c193]
              ${
                index === currentSlide
                  ? "bg-[#00c193] text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              {index + 1}
            </button>
          );
        } else if (
          index === currentSlide - 2 ||
          index === currentSlide + 2
        ) {
          return (
            <span key={index} className="mx-1 text-gray-600">
              ...
            </span>
          );
        }
        return null;
      })}

      {/* Next Button */}
      <button
        disabled={currentSlide === totalSlides - 1}
        onClick={() => onPageChange(currentSlide + 1)}
        className={`px-4 py-1.5 text-sm font-medium shadow-sm transition-all duration-300 border border-[#00c193]
        ${
          currentSlide === totalSlides - 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
