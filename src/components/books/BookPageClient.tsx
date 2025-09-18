"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import BookSection from "@/components/books/BookSection";
import { Book } from "@/lib/types";
import { fetchBooks } from "@/lib/api";
import BookDescription from "@/components/books/BookDescription";
import Header from "@/components/books/Header";
import Hero from "@/components/books/Hero";
import AudioPlayer from "@/components/books/AudioPlayer";
import TinyTalkWidget from "./TinyTalk";

interface BookPageClientProps {
  id: string;
}

export default function BookPageClient({ id }: BookPageClientProps) {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>("Business Book Insights");
  const [subTitle, setSubTitle] = useState<string>(
    "Engaging conversations, deep dives, takeaways, and coaching around the best business books."
  );
  const [courseId, setCourseId] = useState<string>('');
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);

  // Load books
  useEffect(() => {

    const loadBooks = async () => {
      try {

        const data: Book[] = await fetchBooks(id);
        console.log("[fetchBooks] Books:", data[0].course_details);
        setTitle(data[0].course_details.title)
        setSubTitle(data[0].course_details.desc)
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


  // useEffect(() => {
  //   const disableContext = (e: MouseEvent) => e.preventDefault();
  //   const disableKeys = (e: KeyboardEvent) => {
  //     if (e.key === "F12" || e.ctrlKey || e.shiftKey) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", disableContext);
  //   document.addEventListener("keydown", disableKeys);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableContext);
  //     document.removeEventListener("keydown", disableKeys);
  //   };
  // }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = allBooks.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const tagsMatch = book.tag?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        title.includes(searchTerm.toLowerCase()) ||
        author.includes(searchTerm.toLowerCase()) ||
        tagsMatch
      );
    });
    setFilteredBooks(filtered);
  };

  const handleFilterChange = (filter: string) => {
    const filtered = allBooks.filter((book) =>
      book.tag?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
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
        <Header />
        <Hero title={title} subTitle={subTitle} />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#00c193]"></div>
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
            name={userData?.user_data?.name}
            email={userData?.user_data?.email}
            all_books={allBooks}
          />
        )}
      </main>

      <footer className="bg-white text-black py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base leading-relaxed">
            © {new Date().getFullYear()} <span className="font-semibold">CoachBoT</span>. All rights reserved.
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

      <BookDescription book={selectedBook} onClose={handleCloseDescription} />

      <TinyTalkWidget up={showAudioPlayer} />
    </>
  );
}
