"use client";

import React from "react";
import ConversationalForm from "@/components/job-aid/ConversationalForm";
import BookCarousel from "./BookCarousel";
import { usePathname } from "next/navigation";
import SearchFilter from "./SearchFilter";
import CTA from "./CTA";
import { Book } from "@/lib/types";

interface BookSectionProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
}

const BookSection: React.FC<BookSectionProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onSearch,
  onFilterChange,
  onPlayBook,
  onOpenDescription,
}) => {
  const pathname = usePathname();
  return (
    <section className="other-reads" id="section">
      <div className="mt-12">
        {" "}
        {/* 👈 add spacing */}
        <SearchFilter onSearch={onSearch} onFilterChange={onFilterChange} />
      </div>
      <BookCarousel
        books={books}
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        onPlayBook={onPlayBook}
        onOpenDescription={onOpenDescription}
      />
      <br />
      <br />
      <CTA />
      <div className="text-center jobaid-background">
        <ConversationalForm
          job_aid_id="e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2"
          isEmailSection={false}
          inputEmail="undefined@gmail.com"
          inputName="User"
          redirectURL={pathname}
        />
      </div>
    </section>
  );
};

export default BookSection;
