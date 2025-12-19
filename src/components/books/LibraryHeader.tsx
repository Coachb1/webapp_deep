"use client";

import React from "react";
import SearchFilter from "./SearchFilter";
import Carousel from "./CarouselSlider";
import BookCarousel from "./BookCarousel";
import { Book } from "@/lib/types";

interface LibraryHeaderProps {
  /* -------- Library / Filter -------- */
  books: Book[];
  all_books: Book[];

  viewMode: string;
  setViewMode: (v: string) => void;

  onSearch: (term: string) => void;
  onMultipleSearch: (
    tag?: string,
    listName?: string,
    businessOutcome?: string,
    implementationComplexity?: string,
    unexpectedOutcomes?: string,
    emergingPlayers?: string,
    Function?: string,
    startUp?: string
  ) => void;

  onFilterChange: (filter: string) => void;
  handleResetLibrary: () => void;

  availableFilters: any;
  showSearchBar: boolean;
  showLists: boolean;
  defaultFilters: any;

  /* -------- BookCarousel (EXACT MATCH) -------- */
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;

  likedBooks: Book[];
  laterBooks: Book[];
  setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  books,
  all_books,
  viewMode,
  setViewMode,
  onSearch,
  onMultipleSearch,
  onFilterChange,
  handleResetLibrary,
  availableFilters,
  showSearchBar,
  showLists,
  defaultFilters,

  currentSlide,
  onSlideChange,
  onPlayBook,
  onOpenDescription,
  likedBooks,
  laterBooks,
  setLikedBooks,
  setLaterBooks,
}) => {
  return (
    <>
      {/* -------- Title -------- */}
      <div className="text-center mt-10 mb-8 px-6">
        <h1 className="text-2xl md:text-2xl font-bold text-gray-900 leading-snug max-w-6xl mx-auto">
          Transformation Case Library powered by CoachBoT Innovation — now evolved
          into AIAdopts, built for scale, metadata discovery, and enterprise-wide
          AI readiness.
        </h1>

        <div className="mx-auto mt-6 h-[1.5px] bg-gray-300 max-w-4xl opacity-70" />
      </div>

      {/* -------- Search + Filters -------- */}
      <div className="mt-12">
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
          defaultFilters={defaultFilters}
          allBooks={all_books}
        />

        {showLists && (
          <>
            <br />
            <Carousel onFilterChange={onFilterChange} books={books} />
          </>
        )}
      </div>

      {/* -------- Book Results (UNDER SEARCH FILTER) -------- */}
      <br />
      <br />

      <BookCarousel
        books={books}
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        onPlayBook={onPlayBook}
        onOpenDescription={onOpenDescription}
        setViewMode={setViewMode}
        setLikedBooks={setLikedBooks}
        setLaterBooks={setLaterBooks}
        likedBooks={likedBooks}
        laterBooks={laterBooks}
      />
    </>
  );
};

export default LibraryHeader;
