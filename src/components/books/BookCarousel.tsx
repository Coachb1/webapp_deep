"use client";

import React, { useRef, useEffect } from "react";
import Pagination from "@/components/ui/Pagenation";
import BookCard from "./BookCard";
import { Book, CardButtonLebals } from "@/lib/types";

interface BookCarouselProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
  setViewMode: (item: string) => void;
  setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  laterBooks: Book[];
  likedBooks: Book[];
  onlyClientSetup: boolean;
  cardButtonLabels?: CardButtonLebals | null;
}

const booksPerSlide = 12; // 3 rows × 4 books

const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onPlayBook,
  onOpenDescription,
  setLikedBooks,
  setLaterBooks,
  likedBooks,
  laterBooks,
  setViewMode,
  onlyClientSetup,
  cardButtonLabels
}) => {
  const totalSlides = Math.ceil(books.length / booksPerSlide);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const getBooksForSlide = (slideIndex: number) => {
    const start = slideIndex * booksPerSlide;
    return books.slice(start, start + booksPerSlide);
  };

const handlePageChange = (page: number) => {   
   onSlideChange(page)
  const scrollToPagination = () => {
    if (!paginationRef.current) return;

    const paginationTop = paginationRef.current.getBoundingClientRect().top + window.scrollY;

    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    // Scroll so pagination is roughly in the middle of the screen
    const targetTop = paginationTop - headerHeight - window.innerHeight / 2 + paginationRef.current.offsetHeight / 2;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  requestAnimationFrame(scrollToPagination);
}



  return (
    <>
      {/* <div className="w-full max-w-6xl mx-auto px-4">
        <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-green-600 mb-4">
          Our Library
        </h4>
      </div> */}

      {/* No books available message */}
      {books.length === 0 ? (
        <div className="w-[95%] sm:w-[90%] max-w-[1000px] mx-auto py-12">
          <div className="flex items-center justify-center">
            <p className="text-center text-gray-500 text-lg">No data available</p>
          </div>
        </div>
      ) : (
        <>
          {/* Carousel wrapper */}
          <div className="w-[95%] sm:w-[90%] max-w-[1000px] mx-auto">
            
            <div className="flex flex-col items-center justify-center">
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`${
                    slideIndex === currentSlide ? "block" : "hidden"
                  } w-full`}
                >
                  {/* Responsive grid of books */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {getBooksForSlide(slideIndex).map((book, index) => (
                      <BookCard
                        key={book.id ?? index}
                        book={book}
                        onPlay={() => onPlayBook(book, index)}
                        onMore={() => onOpenDescription(book)}
                        setLaterBooks={setLaterBooks}
                        setLikedBooks={setLikedBooks}
                        likedBooks={likedBooks}
                        laterBooks={laterBooks}
                        setViewMode={setViewMode}
                        onlyClientSetup={onlyClientSetup} 
                        globalButtonLabels={cardButtonLabels}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div ref={paginationRef}>
            <Pagination
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BookCarousel;
