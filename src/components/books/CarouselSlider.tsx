"use client";
import { Book } from "@/lib/types";
import { useState, useMemo } from "react";

interface CarouselProps {
  onFilterChange: (filter: string) => void;
  books: Book[];
}

export default function Carousel({ onFilterChange, books }: CarouselProps) {
  // Generate buttons from books' tags and group only once
  const capitalizeWords = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const buttons = useMemo(() => {
  const seen = new Set<string>();
  return books
    .filter(book => book.list_name && book.tag && book.tag.length > 0)
    .map(book => {
      const key = book.list_name.trim().toLowerCase();
      return { key, book };
    })
    .filter(({ key }) => {
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(({ book }) => ({
      label: capitalizeWords(book.list_name),
      filter: book.tag,
    }));
}, []);

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
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* 🔹 Our List Heading */}
      <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-blue-600 mb-4">
        Our List
      </h4>

      {/* Carousel */}
      <div className="relative w-full flex items-center justify-center overflow-hidden">
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
                  onClick={() => onFilterChange(btn.label)}
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

      {/* 🔹 Our Library Heading */}
      <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-blue-600 mt-6">
        Our Library
      </h4>
    </div>
  );
}
