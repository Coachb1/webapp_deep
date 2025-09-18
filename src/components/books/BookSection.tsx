"use client";

import React, { useEffect, useState } from "react";
import ConversationalForm from "@/components/job-aid/ConversationalForm";
import BookCarousel from "./BookCarousel";
import { usePathname } from "next/navigation";
import SearchFilter from "./SearchFilter";
import CTA from "./CTA";
import { Book } from "@/lib/types";
import { getcourseModuleLikesAndSaveLater } from "@/lib/api"; // 👈 make sure this is imported
import Carousel from "./CarouselSlider";
import PageRefresh from "./PageRefreshProp";

interface BookSectionProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
  setFilteredBooks: (books: Book[]) => void;
  setCurrentSlide: (index: number) => void;
  name: string;
  email: string;
  all_books: Book[];
}

const BookSection: React.FC<BookSectionProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onSearch,
  onFilterChange,
  onPlayBook,
  onOpenDescription,
  setFilteredBooks,
  setCurrentSlide,
  name,
  email,
  all_books
}) => {
  console.log("BookSection rendered with books:", books);
  console.log("Current slide:", currentSlide);
  console.log("Name:", name);
  console.log("Email:", email);
  const pathname = usePathname();
  const userId = (window as any)?.user?.user_data?.uid || null;

  const [viewMode, setViewMode] = useState<string>("all");
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [laterBooks, setLaterBooks] = useState<Book[]>([]);

  const handleResetLibrary = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    console.log(randomId);
    setViewMode(`reset-${randomId}`);
    setFilteredBooks(all_books);
  };



  // ✅ One effect to handle filtering
  useEffect(() => {
    if (viewMode === "liked") {
      setFilteredBooks(likedBooks);
    } else if (viewMode === "later") {
      setFilteredBooks(laterBooks);
    } else {
      setFilteredBooks(books);
    }
    // setCurrentSlide(0);
  }, [viewMode, books, likedBooks, laterBooks, setFilteredBooks, setCurrentSlide]);

  // ✅ Fetch liked/later books once
  useEffect(() => {
    if (!userId || books.length === 0) return;

    const fetchLikesAndLater = async () => {
      try {
        // use the first book's course_id (assuming all belong to the same course)
        const courseId = books[0].course_id;
        const result = await getcourseModuleLikesAndSaveLater(courseId, userId);
        const likedIds = result.liked.map((like: any) => like.module_uid);
        const liked = books.filter(book => likedIds.includes(book.id));

        const laterIds = result.later.map((later: any) => later.module_uid);
        const later = books.filter(book => laterIds.includes(book.id));

        setLikedBooks(liked || []);
        setLaterBooks(later || []);

        console.log("Fetched liked books:", liked, likedBooks);
        console.log("Fetched later books:", later, laterBooks);
      } catch (err) {
        console.error("Failed to fetch likes/later:", err);
      }
    };

    fetchLikesAndLater();
  }, []);

  return (
    <section className="other-reads" id="section">
      <div className="mt-12">
        <SearchFilter onSearch={onSearch} onFilterChange={onFilterChange} setViewMode={setViewMode} books={books} viewMode={viewMode} />

        <h1 className="absolute left-48 text-sm font-bold uppercase tracking-wide text-blue-600">
          Our List
        </h1>
        <br />
        <Carousel onFilterChange={onFilterChange} books={books} />
      </div>
        <PageRefresh onReset={handleResetLibrary}  />
      <BookCarousel
        books={books}
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        onPlayBook={onPlayBook}
        onOpenDescription={onOpenDescription}
        setLaterBooks={setLaterBooks}
        setLikedBooks={setLikedBooks}
        likedBooks={likedBooks}
        laterBooks={laterBooks}
        setViewMode={setViewMode}
      />

      <br />
      <br />
      <CTA />

      <div className="text-center jobaid-background">
        <ConversationalForm
          job_aid_id="e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2"
          isEmailSection={false}
          inputEmail={email || "undefined@gmail.com"}
          inputName={name || "User"}
        />
      </div>
    </section>
  );
};

export default BookSection;
