"use client";

import React from "react";
import Pagination from "@/components/ui/Pagenation";
import BookCard from "./BookCard";
import { Book } from "@/lib/types";

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
}

const booksPerSlide = 4;

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
}) => {
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const getBooksForSlide = (slideIndex: number) => {
    const start = slideIndex * booksPerSlide;
    return books.slice(start, start + booksPerSlide);
  };

  return (
    <div className="carousel-container w-[95%] sm:w-[90%] max-w-[1400px] mx-2 sm:mx-4 lg:mx-8 min-h-[600px]">
      {" "}
      <div className="flex flex-col items-center">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`slide ${slideIndex === currentSlide ? "active" : ""}`}
          >
            <div className="card-row">
              {getBooksForSlide(slideIndex).map((book, index) => (
                <BookCard
                  key={index}
                  book={book}
                  onPlay={() => onPlayBook(book, index)}
                  onMore={() => onOpenDescription(book)}
                  setLaterBooks={setLaterBooks}
                  setLikedBooks={setLikedBooks}
                  likedBooks={likedBooks}
                  laterBooks={laterBooks}
                  setViewMode={setViewMode}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onPageChange={onSlideChange}
      />
    </div>
  );
};

export default BookCarousel;
