"use client";

import React from "react";
import Pagination from "@/components/ui/Pagenation";
import BookCard from "./BookCard";
import { Book } from "../data/books";

interface BookCarouselProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
}

const booksPerSlide = 4;

const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onPlayBook,
  onOpenDescription,
}) => {
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const getBooksForSlide = (slideIndex: number) => {
    const start = slideIndex * booksPerSlide;
    return books.slice(start, start + booksPerSlide);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slides">
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
