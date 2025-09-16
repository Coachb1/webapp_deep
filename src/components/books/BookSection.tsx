"use client";

import React, { useEffect, useState } from "react";
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
  

  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [viewMode, setViewMode] = useState<'all' | 'liked' | 'later'>('all');
  
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [laterBooks, setLaterBooks] = useState<Book[]>([]);
  const handleToggleLike = (book: Book) => {
    setLikedBooks(prev => {
      const isLiked = prev.find(b => b.title === book.title);

      if (isLiked) {
        // If already liked, remove it
        const updated = prev.filter(b => b.title !== book.title);

        // If no liked books left, reset to "all"
        if (updated.length === 0) {
          setViewMode("all");
        }

        return updated;
      } else {
        // If not liked yet, add it
        return [...prev, book];
      }
    });
  };



  const handleToggleLater = (book: Book) => {
    setLaterBooks(prev => {
      const isLater = prev.find(b => b.title === book.title);

      if (isLater) {
        // If already saved for later, remove it
        const updated = prev.filter(b => b.title !== book.title);

        // If no "later" books left, reset to "all"
        if (updated.length === 0) {
          setViewMode("all");
        }

        return updated;
      } else {
        // If not saved yet, add it
        return [...prev, book];
      }
    });
  };  
  useEffect(() => {
    if (viewMode === 'liked') {
      setFilteredBooks(likedBooks);
    } else if (viewMode === 'later') {
      setFilteredBooks(laterBooks);
    } else {
      setFilteredBooks(books);
    }
    setCurrentSlide(0);
  }, [viewMode, books ]);

  useEffect(() => {
  if (viewMode === 'liked') {
    setFilteredBooks(likedBooks);
  } else if (viewMode === 'later') {
    setFilteredBooks(laterBooks);
  }
}, [likedBooks, laterBooks]);


  return (
    <section className="other-reads" id="section">
      <div className="mt-12">
        {" "}
        {/* 👈 add spacing */}
        <SearchFilter onSearch={onSearch} onFilterChange={onFilterChange}
          onShowLiked={() => setViewMode('liked')}
          onShowLater={() => setViewMode('later')} />
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
