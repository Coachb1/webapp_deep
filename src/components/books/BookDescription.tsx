"use client";

import { X } from "lucide-react";
import { Book } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import AdvMarkdownHandler from "../MarkdownAdvance";

interface BookDescriptionProps {
  book: Book | null;
  onClose: () => void;
  isTransFormIQ: boolean;
  clientName: string;
}

const BookDescription = ({
  book,
  onClose,
  isTransFormIQ = false,
  clientName,
}: BookDescriptionProps) => {
  if (!book) return null;

  console.debug("Rendering BookDescription for book:", book.title, book.transform_iq);

  /* -----------------------------------------
   Resolve active Transform IQ block
  ------------------------------------------ */
  const activeIQ = useMemo(() => {
    if (!isTransFormIQ || !book.transform_iq) return null;

    return (
      book.transform_iq[clientName] ||
      book.transform_iq["General"] ||
      null
    );
  }, [book, clientName, isTransFormIQ]);

  const roles = useMemo(
    () => (activeIQ?.roles ? Object.keys(activeIQ.roles) : []),
    [activeIQ]
  );

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  /* -----------------------------------------
   Auto-select first role
  ------------------------------------------ */
  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0]);
    } else {
      setSelectedRole(null);
    }
  }, [roles]);

  /* -----------------------------------------
   TRANSFORM IQ VIEW
  ------------------------------------------ */
  if (activeIQ) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div
          className="
            bg-white shadow-xl w-full
            h-[100dvh] sm:h-auto
            max-w-none sm:max-w-8xl
            rounded-none sm:rounded-2xl
            flex flex-col
            relative
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-end gap-3 mb-3 p-4">
            {clientName && (
              <span className="text-xl font-bold text-green-600">
                {clientName.replaceAll("-", " ")}
              </span>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <img
                src={book.img}
                alt={book.title}
                className="w-32 sm:w-40 h-48 sm:h-56 object-cover rounded-lg shadow-md mx-auto md:mx-0"
              />

              {/* Details */}
              <div className="flex flex-col text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {book.title}
                </h2>

                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-gray-600 text-base sm:text-sm">
                    @ {book.author}
                  </h4>

                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Category:</span>{" "}
                    {book.tag.join(", ")}
                  </p>
                </div>

                <span className="font-semibold">Transform IQ Overview</span>
                <div
                  className="border border-gray-300 rounded-lg p-3 bg-gray-50 
                              text-sm sm:text-base text-gray-700 leading-relaxed mb-4
                              h-40 overflow-y-auto white-space: pre-line"
                >
                  <AdvMarkdownHandler content={activeIQ.overview} />
                </div>

                {/* Roles */}
                {roles.length > 0 && (
                  <div className="flex flex-col">
                    <span className="font-semibold">Transform IQ Roles</span>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-300 mt-2">
                      {roles.map((role) => (
                        <button
                          key={role}
                          onClick={() => setSelectedRole(role)}
                          className={`px-4 py-2 text-sm rounded-t-lg border border-gray-300 border-b-0 transition
                            ${
                              selectedRole === role
                                ? "bg-gray-100 font-semibold"
                                : "bg-white hover:bg-gray-50"
                            }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    {/* Role Content */}
                    <div className="border border-gray-200 rounded-b-lg p-4 bg-gray-50 text-gray-700 leading-relaxed h-40 overflow-y-auto">
                      {selectedRole ? (
                        <AdvMarkdownHandler
                          content={activeIQ.roles[selectedRole]}
                        />
                      ) : (
                        "Please select a role."
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } 
    
  
  return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div
          className="
            bg-white shadow-xl w-full
            h-[100dvh] sm:h-auto
            max-w-none sm:max-w-8xl
            rounded-none sm:rounded-2xl
            flex flex-col
            relative
          "
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Book Image */}
              <img
                src={book.img}
                alt={book.title}
                className="w-32 sm:w-40 h-48 sm:h-56 object-cover rounded-lg shadow-md mx-auto md:mx-0"
              />

              {/* Book Details */}
              <div className="flex flex-col text-center md:text-left">
                <h2 className="custom-title text-xl mb-1">{book.title}</h2>
                <h4 className="custom-subtitle  mb-2">
                  Featuring {book.author}
                </h4>

                <p className="custom-subtitle  mb-3 ">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.tag.join(", ")}
                </p>

                <p className=" custom-body mb-2 text-justify break-words">
                  {book.desc}
                </p>
                {/* Summary Notice Box */}
                <div className="custom-subtitle border border-[#00c193] rounded-lg p-3 text-sm text-gray-700 leading-relaxed mt-2">
                  <p>
                    This is a summary only. The Transform IQ view provides relevance at the Org and role level, activated during full implementation.{" "}
                    <a
                      href="https://cdn.coachbots.com/TransformationIQ/transformation%20pdf/Transform-IQ-Sample.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00c193] hover:text-[#00c193]/80 underline font-semibold"
                    >
                      Sample
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
};

export default BookDescription;
