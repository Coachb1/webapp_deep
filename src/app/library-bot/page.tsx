"use client";

import '@/index.css';
import '@/app.css';

import { useEffect, useState } from 'react';
import Script from "next/script";
import Header from '@/components/liberey_bot _ui/Header';
import Hero from '@/components/liberey_bot _ui/Hero';
import SearchFilter from '@/components/liberey_bot _ui/SearchFilter';
import CTA from '@/components/liberey_bot _ui/CTA';
import ChatBot from '@/components/liberey_bot _ui/ChatBot';

import { books } from '@/components/data/books';
import BookDescription from '@/components/liberey_bot _ui/BookDescription';
import PageRefresh from '@/components/liberey_bot _ui/ui/pagerefresh';

import Pagination from '@/components/ui/Pagenation';
import CarouselSlider from '@/components/liberey_bot _ui/ui/CarouselSlider';
import AudioPlayer from '@/components/liberey_bot _ui/AudioPlayer';
import ConversationalForm from "@/components/job-aid/ConversationalForm";
import HeartButton from '@/components/liberey_bot _ui/ui/heartbutton';
import WatchLaterButton from '@/components/liberey_bot _ui/ui/watchLaterButton';
import TinyTalkWidget from '@/components/liberey_bot _ui/ui/tinyTalkWidget';





interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

const Index = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [laterBooks, setLaterBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'liked' | 'later'>('all');




  const handleOpenDescription = (book: Book) => {
    setSelectedBook(book);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };
  // const handleToggleLike = (book: Book) => {
  //   setLikedBooks(prev =>
  //     prev.find(b => b.title === book.title)
  //       ? prev.filter(b => b.title !== book.title)
  //       : [...prev, book]
  //   );
  // };
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


  // const handleToggleLater = (book: Book) => {
  //   setLaterBooks(prev =>
  //     prev.find(b => b.title === book.title)
  //       ? prev.filter(b => b.title !== book.title)
  //       : [...prev, book]
  //   );
  // };
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
  


  // this use for disable charector key like (right click , f12, ctrl+shift+i) -- for console block 
  // Security: disable right-click + key combos

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


  // our librery reset function

  const handleResetLibrary = () => {
    setViewMode("all");       // reset to all books
    setFilteredBooks(books);  // restore original books
  };


  const handleSearch = (searchTerm: string) => {
    const source = viewMode === 'liked' ? likedBooks
      : viewMode === 'later' ? laterBooks
        : books;
    const filtered = books.filter(book => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const tagsMatch = book.tag.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return (
        title.includes(searchTerm.toLowerCase()) ||
        author.includes(searchTerm.toLowerCase()) ||
        tagsMatch
      );
    });
    setFilteredBooks(filtered);
    setCurrentSlide(0); 
  };

  const handleFilterChange = (filter: string) => {
    const filtered = books.filter(book =>
      book.tag.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );
    setFilteredBooks(filtered);
    setCurrentSlide(0); 
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
    const nextBook = filteredBooks[nextIndex];
    setCurrentBook(nextBook);
    setCurrentBookIndex(nextIndex);
  };

  const handlePrevBook = () => {
    const prevIndex = (currentBookIndex - 1 + filteredBooks.length) % filteredBooks.length;
    const prevBook = filteredBooks[prevIndex];
    setCurrentBook(prevBook);
    setCurrentBookIndex(prevIndex);
  };

  // Carousel logic
  const booksPerSlide = 4;
  const totalSlides = Math.ceil(filteredBooks.length / booksPerSlide);

  const showSlide = (index: number) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    setCurrentSlide(index);
  };

  const getBooksForSlide = (slideIndex: number) => {
    const start = slideIndex * booksPerSlide;
    return filteredBooks.slice(start, start + booksPerSlide);
  };

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <br /><br />
        <SearchFilter onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onShowLiked={() => setViewMode('liked')}
          onShowLater={() => setViewMode('later')}
        />
        
        <h1 className="absolute  left-48 text-sm font-bold uppercase tracking-wide text-blue-600 ">Our List </h1>
        <br />
        <CarouselSlider onFilterChange={handleFilterChange} />    {/* { top leader slider } */}



        <section className="other-reads" id="section">
          
          <div className="carousel-container position-relative">
            <PageRefresh onReset={handleResetLibrary} />    {/* our librery */}

            <div className="carousel-slides">

              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`slide ${slideIndex === currentSlide ? "active" : ""}`}
                >
                  <div className="card-row">
                    {getBooksForSlide(slideIndex).map((book, index) => (
                      <article
                        key={index}
                        className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between"
                      >
                        <img
                          src={book.img}
                          alt={book.title}
                          className="rounded-md mb-4 shadow-sm"
                        />

                        {/* heart and watch later button */}
                        <div className="flex gap-8">
                          <button onClick={() => handleToggleLater(book)}>
                            <WatchLaterButton
                              isActive={laterBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLater(book)}
                            />
                          </button>
                          <button onClick={() => handleToggleLike(book)}>
                            <HeartButton
                              isActive={likedBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLike(book)}
                            />
                          </button>
                        </div>

                        <div>
                          <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <a
                            href="#search-container"
                            className="tag inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold"
                          >
                            {book.tag[0]}
                          </a>
                          <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">
                            {book.desc}
                          </p>
                        </div>
                        

                        {/* Book buttons */}
                        <div className="button-container flex items-center gap-28">
                          <button
                            className="play-button rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
                            aria-label="Play audio"
                            onClick={() => handlePlayBook(book, index)}
                          >
                            ▶
                          </button>
                          <button
                            className="more-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
                            onClick={() => handleOpenDescription(book)}
                          >
                            More
                          </button>
                        </div>
                      </article>
                      
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-slides">

              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`slide ${slideIndex === currentSlide ? "active" : ""}`}
                >
                  <div className="card-row">
                    {getBooksForSlide(slideIndex).map((book, index) => (
                      <article
                        key={index}
                        className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between"
                      >
                        <img
                          src={book.img}
                          alt={book.title}
                          className="rounded-md mb-4 shadow-sm"
                        />

                        {/* heart and watch later button */}
                        <div className="flex  gap-8">
                          <button onClick={() => handleToggleLater(book)}>
                            <WatchLaterButton
                              isActive={laterBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLater(book)}
                            />
                          </button>
                          <button onClick={() => handleToggleLike(book)}>
                            <HeartButton
                              isActive={likedBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLike(book)}
                            />
                          </button>
                        </div>

                        <div>
                          <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <a
                            href="#search-container"
                            className="tag inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold"
                          >
                            {book.tag[0]}
                          </a>
                          <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">
                            {book.desc}
                          </p>
                        </div>
                        

                        {/* Book buttons */}
                        <div className="button-container flex items-center gap-28">
                          <button
                            className="play-button rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
                            aria-label="Play audio"
                            onClick={() => handlePlayBook(book, index)}
                          >
                            ▶
                          </button>
                          <button
                            className="more-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
                            onClick={() => handleOpenDescription(book)}
                          >
                            More
                          </button>
                        </div>
                      </article>
                      
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-slides">

              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`slide ${slideIndex === currentSlide ? "active" : ""}`}
                >
                  <div className="card-row">
                    {getBooksForSlide(slideIndex).map((book, index) => (
                      <article
                        key={index}
                        className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between"
                      >
                        <img
                          src={book.img}
                          alt={book.title}
                          className="rounded-md mb-4 shadow-sm"
                        />

                        {/* heart and watch later button */}
                        <div className="flex  gap-8">
                          <button onClick={() => handleToggleLater(book)}>
                            <WatchLaterButton
                              isActive={laterBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLater(book)}
                            />
                          </button>
                          <button onClick={() => handleToggleLike(book)}>
                            <HeartButton
                              isActive={likedBooks.some(b => b.title === book.title)}
                              onToggle={() => handleToggleLike(book)}
                            />
                          </button>
                        </div>

                        <div>
                          <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <a
                            href="#search-container"
                            className="tag inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold"
                          >
                            {book.tag[0]}
                          </a>
                          <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">
                            {book.desc}
                          </p>
                        </div>
                        

                        {/* Book buttons */}
                        <div className="button-container flex items-center gap-28">
                          <button
                            className="play-button rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
                            aria-label="Play audio"
                            onClick={() => handlePlayBook(book, index)}
                          >
                            ▶
                          </button>
                          <button
                            className="more-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
                            onClick={() => handleOpenDescription(book)}
                          >
                            More
                          </button>
                        </div>
                      </article>
                      
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <br />
            <Pagination
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              onPageChange={showSlide}
            />
          </div>

          <br /><br />
          <CTA />

          <div className="text-center jobaid-background">
            <ConversationalForm
              job_aid_id="e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2"
              isEmailSection={false}
            />
          </div>
          <br />
        </section>
      </main>

      <div className="copyright">
        <p>
          Copyright for all books belongs to their respective authors and
          publishers. We encourage you to buy and read actual books. (C) CoachBoT,
          2025
        </p>
      </div>

      <AudioPlayer
        show={showAudioPlayer}
        book={currentBook}
        onClose={handleClosePlayer}
        onNext={handleNextBook}
        onPrev={handlePrevBook}
      />

      {/* Book popup modal */}
      <BookDescription book={selectedBook} onClose={handleCloseDescription} />

      {/* TinyTalk Script */}
{/* <div className="fixed bottom-32 right-4 z-[9999]">
  <Script
    src="https://cdn.tinytalk.ai/latest/tiny-talk-sdk.min.umd.js"
    data-tiny-bot-id="b0a8b8ba-72b6-43a2-a59f-ee20b6f29c8d"
    strategy="afterInteractive"
  />
</div> */}
      <TinyTalkWidget />

    </>
  );
};

export default Index;


