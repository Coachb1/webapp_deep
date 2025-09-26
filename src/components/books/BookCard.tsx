"use client";

import { Book } from "@/lib/types";
import React, { useEffect, useState } from "react";
import WatchLaterButton from "./ui/watchLaterButton";
import HeartButton from "./ui/heartbutton";
import { addModuleLater, addModuleLike } from "@/lib/api";
import { useUser } from "./context/UserContext";

interface BookCardProps {
  book: Book;
  onPlay: () => void;
  onMore: () => void;
  setViewMode: (item: string) => void;
  setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  laterBooks: Book[];
  likedBooks: Book[];
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onPlay,
  onMore,
  setViewMode,
  setLikedBooks,
  setLaterBooks,
  likedBooks,
  laterBooks,
}) => {

  const {user} = useUser()
  const user_id = user?.user_data?.uid;



  const handleToggleLike = (book: Book) => {
    setLikedBooks((prev: Book[]) => {
      const isLiked = prev.find((b: Book) => b.title === book.title);
      if (isLiked) {
        const updated = prev.filter((b: Book) => b.title !== book.title);
        if (updated.length === 0) setViewMode("all");
        return updated;
      } else {
        return [...prev, book];
      }
    });
    console.log("user_id bookcard", user_id);
    addModuleLike(book.id, user_id!);
  };

  const handleToggleLater = (book: Book) => {
    setLaterBooks((prev) => {
      const isLater = prev.find((b) => b.title === book.title);
      if (isLater) {
        const updated = prev.filter((b) => b.title !== book.title);
        if (updated.length === 0) setViewMode("all");
        return updated;
      } else {
        return [...prev, book];
      }
    });
    addModuleLater(book.id, user_id!);
  };

  return (
    <article className="shadow-md rounded-lg bg-white p-3 flex flex-col justify-between border border-[#00c193]">
      {/* Book Cover */}
      <img
        src={book.img}
        alt={book.title}
        className="rounded-md mb-4 shadow-sm w-full object-cover aspect-[3/4]"
      />
      {/* Watch Later + Like */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-0 lg:justify-between">
        {/* Listen Later */}
        <button onClick={() => handleToggleLater(book)} className="shrink-0">
          <WatchLaterButton
            isActive={laterBooks.some((b) => b.title === book.title)}
            onToggle={() => { }}
          />
        </button>

        {/* Heart */}
        <button
          onClick={() => handleToggleLike(book)}
          className="shrink-0 md:-ml-1 lg:ml-auto"
        >
          <HeartButton
            isActive={likedBooks.some((b) => b.title === book.title)}
            onToggle={() => { }}
          />
        </button>
      </div>




      {/* Book Info */}
      <div>
        <h4 className="font-bold text-lg mb-1 truncate" title={book.title}>
          {book.title}
        </h4>
        <p className="text-gray-600 mb-2 truncate" title={book.author}>
          {book.author}
        </p>
        <a
          href="#search-container"
          className="inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold"
        >
          {book.tag[0]}
        </a>
        <p
          className="text-gray-700 text-sm mb-4 line-clamp-2"
          title={book.desc}
        >
          {book.desc}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* ▶ Play Button */}
        <button
          className="rounded-full border border-green-500 text-green-500 
               w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
               hover:bg-green-100 transition shrink-0"
          aria-label="Play audio"
          onClick={onPlay}
        >
          ▶
        </button>

        {/* More Button */}
        <button
          className="rounded-full border border-[#00c193] bg-[#00c193] text-white 
               px-3 py-1.5 sm:px-4 sm:py-2 
               text-xs sm:text-sm md:text-base 
               hover:bg-[#00b281] transition shrink-0 ml-auto"
          onClick={onMore}
        >
          More
        </button>
      </div>



      {/* Finished Status + Progress */}
      <div className="flex items-center mt-3 gap-2">
        <span className="text-gray-700 text-sm">8 Jun • Finished</span>

        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00c193] text-white text-xs font-bold shadow-md">
          ✓
        </div>

        {/* progress */}
        <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-2 bg-green-500 w-1/2"></div> 
        </div>
      </div>






    </article>
  );
};

export default BookCard;
