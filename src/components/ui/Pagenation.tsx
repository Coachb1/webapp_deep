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
        className={`custom-btn btn-sm`}
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
              className={`custom-btn btn-sm page-btn
                ${
                  index === currentSlide
                    ? "page-btn-active"
                    : "page-btn-inactive"
                }`}
              style={{ borderRadius: "6px" }}
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
        className={`custom-btn btn-sm`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
