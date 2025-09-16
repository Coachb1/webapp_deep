"use client";
import { useState } from "react";

interface CarouselProps {
  onFilterChange: (filter: string) => void;
}

export default function Carousel({ onFilterChange }: CarouselProps) {
  // Map button names to their filter categories
  const buttons = [
    { label: "Books for new manager", filter: "Leadership" },
    { label: "Getting promoted", filter: "Innovation" },
    { label: "Delivering effective feedback", filter: "Productivity" },
    { label: "Ratan Tatas Top 5 favourites", filter: "Finance" },
    // Other buttons (no filters yet)

  ];

  // in a line how many items you want to show per slide
  const itemsPerPage = 4;
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index + itemsPerPage < buttons.length) {
      setIndex(index + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (index - itemsPerPage >= 0) {
      setIndex(index - itemsPerPage);
    }
  };

  return (


      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center overflow-hidden">
  {/* Left button */}
  <button
    onClick={prevSlide}
    className="bg-[#00c193] text-white px-4 py-3 rounded-full shadow-md 
       hover:bg-[#069473] z-10"
  >
    {"<<"}
  </button>

  {/* Sliding container */}
  <div className="relative w-full overflow-hidden">
    <div
      className="flex transition-transform duration-500 ease-in-out gap-4 justify-center"
      style={{ transform: `translateX(-${(index / itemsPerPage) * 100}%)` }}
    >
      {buttons.map((btn, i) => (
        <div key={i} className="flex-shrink-0">
          <button
            onClick={() => onFilterChange(btn.filter || btn.label)}
            className="text-[#00c193] 
              font-bold text-sm px-4 py-2 rounded-lg bg-green-200 text-green-700
              cursor-pointer transition-colors duration-300
              text-center whitespace-nowrap overflow-hidden text-ellipsis
              border-b-2 border-[#00c193] hover:text-[#069473] hover:border-[#069473]"
          >
            {btn.label}
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Right button */}
  <button
    onClick={nextSlide}
    className="bg-[#00c193] text-white px-4 py-3 rounded-full shadow-md
       hover:bg-[#069473] z-10"
  >
    {">>"}
  </button>
</div>

  
  );
}
