"use client";

import '@/index.css';
import '@/app.css';

import { useEffect, useState } from 'react';
import Script from "next/script";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import CTA from '@/components/CTA';
import ChatBot from '@/components/ChatBot';

import { books } from '@/components/data/books';
import BookDescription from '@/components/BookDescription';

import Pagination from '@/components/ui/Pagenation';

import AudioPlayer from '@/components/ui/AudioPlayer';






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

  const handleOpenDescription = (book: Book) => {
    setSelectedBook(book);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };


  // Removed call to undefined function createSlidesFromBooks
  useEffect(() => {
    // No operation needed here currently
  }, [filteredBooks]);

  const handleSearch = (searchTerm: string) => {
    const filtered = books.filter(book => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const tagsMatch = book.tag.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return title.includes(searchTerm.toLowerCase()) ||
        author.includes(searchTerm.toLowerCase()) ||
        tagsMatch;
    });
    setFilteredBooks(filtered);
  };

  const handleFilterChange = (filter: string) => {
    const filtered = books.filter(book =>
      book.tag.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
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
        <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

        <section className="other-reads" id="section">
          <div className="carousel-container">
            <div className="carousel-slides">
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`slide ${slideIndex === currentSlide ? 'active' : ''}`}
                >
                  <div className="card-row">
                    {getBooksForSlide(slideIndex).map((book, index) => (
                      <article key={index} className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between">
                        <img src={book.img} alt={book.title} className="rounded-md mb-4 shadow-sm" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                          <p className="text-gray-600 mb-2">{book.author}</p>
                          <a href="#search-container" className="tag inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
                            {book.tag[0]}
                          </a>
                          <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">{book.desc}</p>
                        </div>


                        {/* Book Under More and Play Button */}


                        <div className="button-container flex items-center gap-4">
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
            <Pagination
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              onPageChange={showSlide}
            />
            
          </div>
          <br /><br />
          <CTA />
          <ChatBot />
          <br />
        </section>
      </main>

      <div className="copyright">
        <p>Copyright for all books belongs to their respective authors and publishers. We encourage you to buy and read actual books. (C) CoachBoT, 2025</p>
      </div>

      <AudioPlayer
        show={showAudioPlayer}
        book={currentBook}
        onClose={handleClosePlayer}
        onNext={handleNextBook}
        onPrev={handlePrevBook}
      />

      {/* Book popup modal */}

      <BookDescription
        book={selectedBook}
        onClose={handleCloseDescription}
      />
      <Script
  src="https://cdn.tinytalk.ai/latest/tiny-talk-sdk.min.umd.js"
  data-tiny-bot-id="b0a8b8ba-72b6-43a2-a59f-ee20b6f29c8d"
  strategy="afterInteractive"
/>


    </>
  );
};

export default Index;
