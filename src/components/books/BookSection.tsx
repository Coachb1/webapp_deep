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
import { ActionsPerMonth } from "@/lib/api";

interface BookSectionProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onSearch: (term: string) => void;
  onMultipleSearch: (tag?: string, listName?: string, businessOutcome?: string, implementationComplexity?: string, unexpectedOutcomes?: string, emergingPlayers?: string, Function?: string, startUp?: string) => void;
  onFilterChange: (filter: string) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
  setFilteredBooks: (books: Book[]) => void;
  setCurrentSlide: (index: number) => void;
  name: string;
  email: string;
  all_books: Book[];
  jobAidId: string | null;
  promptJobAidId?: string | null;
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
  promptJobAidId,
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
  const [showBadge, setShowBadge] = useState(false);
  const [completedTransformations, setCompletedTransformations] = useState(0);
  const [completedCases, setCompletedCases] = useState(0);

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
    } else if (viewMode === 'reset') {
      list = all_books
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

  useEffect(() => {
    // Show badge if user has admin access
    if (userInfo?.libraryBotConfig?.show_certification_badge === true) {
      setShowBadge(true);
    } else {
      setShowBadge(false);
    }

    async function getLibActions(userId: string) {
      const data = await ActionsPerMonth(userId);
      if (data.jobaid_sessions_created) {
        setCompletedTransformations(data.jobaid_sessions_created);
      }
      if (data.modules_completed) {
        setCompletedCases(data.modules_completed);
      }
    }
    if (user?.user_data?.uid) {
      getLibActions(user?.user_data?.uid)
    }
  }, [userInfo]);


  return (
    <section className="other-reads" id="section">
      {/* ⭐ Prompt Job Aid Section (Top) */}
      {promptJobAidId && (
        <div className="flex justify-center items-center bg-gray-100 p-6 mb-6 rounded-lg mt-10">
          <ConversationalForm
            job_aid_id={promptJobAidId}
            isEmailSection={false}
            inputEmail={email || "undefined@gmail.com"}
            inputName={name || "User"}
          />
        </div>
      )}
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
          defaultFilters={userInfo.libraryBotConfig?.default_filters || {}}
          allBooks={all_books}
        />
        {showLists && <>
          <br />
          <Carousel onFilterChange={onFilterChange} books={books} />
        </>}

      </div>
      {/* <PageRefresh onReset={handleResetLibrary}  /> */}
      <br />
      <br />
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
      {/* Progress Section */}
      {showBadge && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Master the case library. Earn a verifiable credential: Certified Transformation leader</h2>
              <p className="text-lg text-gray-600 max-w-[90%] xl:max-w-[80%] mx-auto">
                Awarded to leaders who demonstrate consistent mastery of real-world case patterns while logging innovation ideas. Earn this verifiable badge by deeply analyzing 5+ cases and/or logging two transformation project ideas every month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Progress Card */}
              <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Based on your Case Progress this Month</h3>
                <div className="flex items-center justify-center space-x-3 text-4xl my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.min(completedCases, 5) ? "text-yellow-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                <p className="mt-3 text-center text-gray-600">{Math.min(completedCases, 5)}/5 cases completed this month</p>
              </div>

              {/* Transformation Logs Card */}
              <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Based on your Tranformation Logs this Month</h3>
                <div className="flex items-center justify-center space-x-3 text-4xl my-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={i < Math.min(completedTransformations, 3) ? "text-yellow-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                <p className="mt-3 text-center text-gray-600">{Math.min(completedTransformations, 3)}/3 transformations logs this month</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>

  );
};

/* setSearchTerm is now handled by useState above */
export default BookSection;
