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
        <div className="pagination flex justify-center items-center gap-2 mt-4">
            {/* Prev Button */}
            <button
                className="page-btn"
                disabled={currentSlide === 0}
                onClick={() => onPageChange(currentSlide - 1)}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalSlides }).map((_, index) => {
                if (
                    index === 0 || // first
                    index === totalSlides - 1 || // last
                    (index >= currentSlide - 1 && index <= currentSlide + 1) // around current
                ) {
                    return (
                        <button
                            key={index}
                            className={`page-number ${index === currentSlide ? "active" : ""}`}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </button>
                    );
                } else if (
                    index === currentSlide - 2 ||
                    index === currentSlide + 2
                ) {
                    return <span key={index}>...</span>;
                }
                return null;
            })}

            {/* Next Button */}
            <button
                className="page-btn"
                disabled={currentSlide === totalSlides - 1}
                onClick={() => onPageChange(currentSlide + 1)}
            >
                Next
            </button>
        </div>

    );
};

export default Pagination;
