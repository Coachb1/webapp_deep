// "use client";
// import React from "react";

// interface PaginationProps {
//     totalSlides: number;
//     currentSlide: number;
//     onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//     totalSlides,
//     currentSlide,
//     onPageChange,
// }) => {
//     return (
//         <div className="pagination flex justify-center items-center gap-2 mt-4">
//             {/* Prev Button */}
//             <button
//                 className="page-btn"
//                 disabled={currentSlide === 0}
//                 onClick={() => onPageChange(currentSlide - 1)}
//             >
//                 Prev
//             </button>

//             {/* Page Numbers */}
//             {Array.from({ length: totalSlides }).map((_, index) => {
//                 if (
//                     index === 0 || // first
//                     index === totalSlides - 1 || // last
//                     (index >= currentSlide - 1 && index <= currentSlide + 1) // around current
//                 ) {
//                     return (
//                         <button
//                             key={index}
//                             className={`page-number ${index === currentSlide ? "active" : ""}`}
//                             onClick={() => onPageChange(index)}
//                         >
//                             {index + 1}
//                         </button>
//                     );
//                 } else if (
//                     index === currentSlide - 2 ||
//                     index === currentSlide + 2
//                 ) {
//                     return <span key={index}>...</span>;
//                 }
//                 return null;
//             })}

//             {/* Next Button */}
//             <button
//                 className="page-btn"
//                 disabled={currentSlide === totalSlides - 1}
//                 onClick={() => onPageChange(currentSlide + 1)}
//             >
//                 Next
//             </button>
//         </div>

//     );
// };

// export default Pagination;


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
        className={`px-4 py-2 text-sm font-bold rounded-full shadow-md transition 
        ${
          currentSlide === 0
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-[#00c193] text-white hover:bg-[#069473]"
        }`}
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
              className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm shadow-md cursor-pointer mx-[2px] transition
              ${
                index === currentSlide
                  ? "bg-[#069473] text-white"
                  : "bg-[#00c193] text-white hover:bg-[#069473]"
              }`}
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
        className={`px-4 py-2 text-sm font-bold rounded-full shadow-md transition 
        ${
          currentSlide === totalSlides - 1
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-[#00c193] text-white hover:bg-[#069473]"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
