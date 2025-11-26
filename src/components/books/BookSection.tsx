"use client";

import React, { useEffect, useMemo, useState } from "react";
import ConversationalForm from "@/components/job-aid/ConversationalForm";
import BookCarousel from "./BookCarousel";
import { usePathname } from "next/navigation";
import SearchFilter from "./SearchFilter";
import CTA from "./CTA";
import { Book } from "@/lib/types";
import { getcourseModuleLikesAndSaveLater } from "@/lib/api"; // 👈 make sure this is imported
import Carousel from "./CarouselSlider";
import PageRefresh from "./PageRefreshProp";
import { usePortalUser } from "./context/UserContext";

interface BookSectionProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onSearch: (term: string) => void;
  onMultipleSearch: (tag?: string, listName?: string, businessOutcome?: string, implementationComplexity?: string, unexpectedOutcomes?: string, emergingPlayers?: string, Function?:string, startUp?: string) => void;
  onFilterChange: (filter: string) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
  setFilteredBooks: (books: Book[]) => void;
  setCurrentSlide: (index: number) => void;
  name: string;
  email: string;
  all_books: Book[];
  jobAidId: string| null;
  packageDetails: any;
}

const BookSection: React.FC<BookSectionProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onSearch,
  onMultipleSearch,
  onFilterChange,
  onPlayBook,
  onOpenDescription,
  setFilteredBooks,
  setCurrentSlide,
  name,
  email,
  all_books,
  jobAidId,
  packageDetails,
}) => {
  console.log("BookSection rendered with books:", books);
  console.log("Current slide:", currentSlide);
  console.log("Name:", name);
  console.log("Email:", email);
  const pathname = usePathname();
  const { user, userInfo, loading } = usePortalUser();
  const userId = user?.user_data?.uid || null;

  const [viewMode, setViewMode] = useState<string>("all");
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [laterBooks, setLaterBooks] = useState<Book[]>([]);
  const [availableFilters, setAvailableFilters] = useState<string>("");
  const [showLists, setShowLists] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const handleResetLibrary = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    console.log(randomId);
    setViewMode(`reset-${randomId}`);
    setFilteredBooks(all_books);
  };

  const filteredBooks = useMemo(() => {
    let list = books;

    if (viewMode === "liked") {
      list = likedBooks;
    } else if (viewMode === "later") {
      list = laterBooks;
    }
    return list;
  }, [books, viewMode, likedBooks, laterBooks]);

  useEffect(() => {
    setFilteredBooks(filteredBooks);
    setCurrentSlide(0);
  }, [filteredBooks, setFilteredBooks, setCurrentSlide]);


  useEffect(() => {
    console.log('[package data:', packageDetails)
    setAvailableFilters(packageDetails?.report_config?.show_filters ?? []);
    setShowLists(packageDetails?.report_config?.show_lists ?? true);
    setShowSearchBar(packageDetails?.report_config?.show_search ?? true);
  }, [packageDetails]);

  // ✅ Fetch liked/later books once
  useEffect(() => {
    if (!userId || books.length === 0) return;

    const fetchLikesAndLater = async () => {
      try {
        const courseId = books[0].course_id;
        const result = await getcourseModuleLikesAndSaveLater(courseId, userId);
        const likedIds = result.liked.map((like: any) => like.module_uid);
        const laterIds = result.later.map((later: any) => later.module_uid);

        setLikedBooks(books.filter((b) => likedIds.includes(b.id)));
        setLaterBooks(books.filter((b) => laterIds.includes(b.id)));
      } catch (err) {
        console.error("Failed to fetch likes/later:", err);
      }
    };

    fetchLikesAndLater();
  }, [userId]);

  return (
    <section className="other-reads" id="section">
      <div className="mt-12">
        {!loading && (
        <SearchFilter
          onSearch={onSearch}
          onMultipleSearch={onMultipleSearch}
          onFilterChange={onFilterChange}
          setViewMode={setViewMode}
          books={books}
          viewMode={viewMode}
          handleResetLibrary={handleResetLibrary}
          availableFilters={availableFilters}
          showSearchBar={showSearchBar}
          defaultFilters={userInfo.libraryBotConfig?.default_filters || {}}
          allBooks={all_books}
        />)}
        {showLists && <>
          <br />
          <Carousel onFilterChange={onFilterChange} books={books} />
        </>}

      </div>
      {/* <PageRefresh onReset={handleResetLibrary}  /> */}
      <br />
      <br />
      {!loading&&(
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
)}

      <br />
      <br />
      {/* <CTA /> */}
      {jobAidId && (
        <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
          <ConversationalForm
            job_aid_id={jobAidId}
            isEmailSection={false}
            inputEmail={email || "undefined@gmail.com"}
            inputName={name || "User"}
          />
        </div>
      )}
    </section>
  );
};

/* setSearchTerm is now handled by useState above */
export default BookSection;
