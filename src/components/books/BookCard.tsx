"use client";

import { Book } from "@/lib/types";
import React, { useState } from "react";
import WatchLaterButton from "./ui/watchLaterButton";
import HeartButton from "./ui/heartbutton";

interface BookCardProps {
  book: Book;
  onPlay: () => void;
  onMore: () => void;
}


const BookCard: React.FC<BookCardProps> = ({ book, onPlay, onMore }) => {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [laterBooks, setLaterBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'liked' | 'later'>('all');

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

  return (
    <article className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between">
      <img src={book.img} alt={book.title} className="rounded-md mb-4 shadow-sm" />
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
        <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">{book.desc}</p>
      </div>

      <div className="button-container flex items-center gap-4">
        <button
          className="play-button rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
          aria-label="Play audio"
          onClick={onPlay}
        >
          ▶
        </button>
        <button
          className="more-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
          onClick={onMore}
        >
          More
        </button>
      </div>
    </article>
  );
};

export default BookCard;
