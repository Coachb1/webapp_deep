"use client";

import { X } from "lucide-react";
import { Book } from "@/lib/types";
import { useState } from "react";

interface BookDescriptionProps {
  book: Book | null;
  onClose: () => void;
  isTransFormIQ: boolean;
}


const BookDescription = ({ book, onClose, isTransFormIQ=false }: BookDescriptionProps) => {
  if (!book) return null;

  console.info('book', book)
  if (isTransFormIQ && book?.transform_iq?.overview && book?.transform_iq?.roles){

    const roles = Object.keys(book.transform_iq?.roles)
    const [selectedRole, setSelectedRole] = useState<string | null>(roles.length > 0 ?roles[0]: null);
    
    return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-6 max-w-8xl w-full relative transform transition-all scale-95 animate-in fade-in-50 duration-200"
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
              className="w-32 sm:w-40 h-48 sm:h-56 object-cover rounded-lg shadow-md mx-auto md:mx-0"
            />

            {/* Book Details */}
            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {book.title}
              </h2>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-gray-600 text-base sm:text-sm">
                  @ {book.author}
                </h4>

                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Category:</span> {book.tag.join(", ")}
                </p>
              </div>

              <span className="font-semibold">Transform IQ Overview</span>
              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                {book.transform_iq?.overview}
              </div>

              {/* Transform IQ Role */}
              {/* Transform IQ Role */}
              <div className="flex flex-col  mb-2">
                <span className="font-semibold">Transform IQ Role</span>

                {/* Tabs Row (attached to box) */}
                <div className="flex items-center gap-2 border-b border-gray-300">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`
                      px-4 py-2 text-sm rounded-t-lg
                      border border-gray-300 border-b-0
                      transition-all
                      ${selectedRole === role
                                    ? "bg-gray-100 font-semibold"     // Selected tab matches box color
                                    : "bg-white hover:bg-gray-50"    // Default tab appearance
                                  }
                    `}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {/* Role Description Box */}
                <div className="border border-gray-200 rounded-b-lg p-4 bg-gray-50 text-gray-700 leading-relaxed">
                  {selectedRole ? (
                    <div>
                      <span className="font-semibold">{selectedRole} Overview</span>
                      <p className="mt-1 text-sm">
                        {book.transform_iq?.roles[selectedRole]}
                      </p>
                    </div>
                  ) : (
                    "Please select a role."
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
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
            className="w-32 sm:w-40 h-48 sm:h-56 object-cover rounded-lg shadow-md mx-auto md:mx-0"
          />

          {/* Book Details */}
          <div className="flex flex-col text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {book.title}
            </h2>
            <h4 className="text-gray-600 text-base sm:text-lg mb-2">
              by {book.author}
            </h4>

            <p className="text-sm text-gray-500 mb-3">
              <span className="font-semibold">Category:</span>{" "}
              {book.tag.join(", ")}
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              {book.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  }
};

export default BookDescription;
