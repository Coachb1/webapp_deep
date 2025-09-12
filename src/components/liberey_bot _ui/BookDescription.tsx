"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

interface BookDescriptionProps {
  book: Book | null;
  onClose: () => void;
}

const BookDescription = ({ book, onClose }: BookDescriptionProps) => {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full relative transform transition-all scale-95 animate-in fade-in-50 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Image */}
          <img
            src={book.img}
            alt={book.title}
            className="w-40 h-56 object-cover rounded-lg shadow-md mx-auto md:mx-0"
          />

          {/* Book Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{book.title}</h2>
            <h4 className="text-gray-600 text-lg mb-2">by {book.author}</h4>

            <p className="text-sm text-gray-500 mb-3">
              <span className="font-semibold">Category:</span>{" "}
              {book.tag.join(", ")}
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {book.desc}
            </p>

            {/* <Button className="bg-green-600 hover:bg-green-700 text-white self-start rounded-full px-5">
              Start Reading
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
