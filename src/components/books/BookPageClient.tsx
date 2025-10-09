
"use client";

import { useState, useEffect } from "react";
import BookSection from "@/components/books/BookSection";
import { Book } from "@/lib/types";
import { fetchBooks } from "@/lib/api";
import BookDescription from "@/components/books/BookDescription";
import Header from "@/components/books/Header";
import Hero from "@/components/books/Hero";
import AudioPlayer from "@/components/books/AudioPlayer";
import TinyTalkWidget from "./TinyTalk";
import { usePortalUser } from "./context/UserContext";

interface BookPageClientProps {
  id: string;
}

export default function BookPageClient({ id }: BookPageClientProps) {
  const { user } = usePortalUser();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>("Business Book Insights");
  const [subTitle, setSubTitle] = useState<string>(
    "Engaging conversations, deep dives, takeaways, and coaching around the best business books."
  );
  const [courseId, setCourseId] = useState("");
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Load books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data: Book[] = await fetchBooks(id);
        console.log("[fetchBooks] Books:", data[0].package_detail);
        if (!data || !data.length) return;

        setTitle(data[0].package_detail.package_name);
        setSubTitle(data[0].package_detail.package_description);
        setCourseId(data[0].course_id);

        setAllBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [id]);

  const handleSearch = (searchTerm: string) => {
    const queryStr = searchTerm.trim();

    if (!queryStr) {
      setFilteredBooks(allBooks);
      return;
    }

    const queries = queryStr
      .split(",")
      .map((q) => q.trim().toLowerCase())
      .filter((f) => f.length > 0);

    const filtered = allBooks.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const author = book.author?.toLowerCase() || "";
      const listName = book.list_name?.toLowerCase() || "";
      const tags = book.tag?.map((t) => t.toLowerCase()) || [];

      return queries.some(
        (query) =>
          title.includes(query) ||
          author === query ||
          listName === query ||
          tags.some((tag) => tag === query)
      );
    });

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (filter: string) => {
    const normalized = filter.trim().toLowerCase();

    if (!normalized || normalized === "filter") {
      setFilteredBooks(allBooks);
      return;
    }

    const filters = normalized
      .split(",")
      .map((f) => f.trim().toLowerCase())
      .filter((f) => f.length > 0);

    const filtered = allBooks.filter((book) => {
      const listName = book.list_name?.toLowerCase() || "";
      const tags = book.tag?.map((t) => t.toLowerCase()) || [];
      return filters.some(
        (f) => listName === f || tags.some((tag) => tag === f)
      );
    });

    setFilteredBooks(filtered);
  };

  const handlePlayBook = (book: Book, index: number) => {
    setCurrentBook(book);
    setCurrentBookIndex(index);
    setShowAudioPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowAudioPlayer(false);
    setCurrentBook(null);
  };

  const handleNextBook = () => {
    const nextIndex = (currentBookIndex + 1) % filteredBooks.length;
    setCurrentBook(filteredBooks[nextIndex]);
    setCurrentBookIndex(nextIndex);
  };

  const handlePrevBook = () => {
    const prevIndex =
      (currentBookIndex - 1 + filteredBooks.length) % filteredBooks.length;
    setCurrentBook(filteredBooks[prevIndex]);
    setCurrentBookIndex(prevIndex);
  };

  const handleOpenDescription = (book: Book) => {
    setSelectedBook(book);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };

  return (
    <>
      <main id="top">
        <Header packageCourseId={id} />
        <Hero title={title} subTitle={subTitle} />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-[#00c193]"></div>
          </div>
        ) : (
          <BookSection
            books={filteredBooks}
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onPlayBook={handlePlayBook}
            onOpenDescription={handleOpenDescription}
            setFilteredBooks={setFilteredBooks}
            setCurrentSlide={setCurrentSlide}
            name={user?.user_data?.name}
            email={user?.user_data?.email}
            all_books={allBooks}
          />
        )}
      </main>

      <footer className="bg-white text-black py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base leading-relaxed">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">CoachBoT</span>. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Copyright for all books belongs to their respective authors and
            publishers. We encourage you to buy and read actual books.
          </p>
        </div>
      </footer>

      <AudioPlayer
        show={showAudioPlayer}
        book={currentBook}
        onClose={handleClosePlayer}
        onNext={handleNextBook}
        onPrev={handlePrevBook}
        courseId={courseId}
      />

      <BookDescription
        book={selectedBook}
        onClose={handleCloseDescription}
      />

      {/* <TinyTalkWidget up={showAudioPlayer} /> */}
    </>
  );
}
