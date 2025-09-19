// "use client";

// import React from "react";
// import Pagination from "@/components/ui/Pagenation";
// import BookCard from "./BookCard";
// import { Book } from "@/lib/types";

// interface BookCarouselProps {
//   books: Book[];
//   currentSlide: number;
//   onSlideChange: (index: number) => void;
//   onPlayBook: (book: Book, index: number) => void;
//   onOpenDescription: (book: Book) => void;
//   setViewMode: (item: string) => void;
//   setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
//   setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
//   laterBooks: Book[];
//   likedBooks: Book[];
// }


// const booksPerSlide = 12; // 3 rows × 4 books

// const BookCarousel: React.FC<BookCarouselProps> = ({
  
//   books,
//   currentSlide,
//   onSlideChange,
//   onPlayBook,
//   onOpenDescription,
//   setLikedBooks,
//   setLaterBooks,
//   likedBooks,
//   laterBooks,
//   setViewMode,
// }) => {
  
//   const totalSlides = Math.ceil(books.length / booksPerSlide);

//   const getBooksForSlide = (slideIndex: number) => {
//     const start = slideIndex * booksPerSlide;
//     return books.slice(start, start + booksPerSlide);
//   };

//   return (
//     <>
//     <div className="carousel-container w-[95%] sm:w-[90%] max-w-[1400px] mx-auto">
//       {" "}
//       <div className="flex flex-col items-center justify-center">
//         {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//           <div
//             key={slideIndex}
//             className={`slide ${slideIndex === currentSlide ? "active" : "hidden"} w-full`}
//           >
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//               {getBooksForSlide(slideIndex).map((book, index) => (
//                 <BookCard
//                   key={index}
//                   book={book}
//                   onPlay={() => onPlayBook(book, index)}
//                   onMore={() => onOpenDescription(book)}
//                   setLaterBooks={setLaterBooks}
//                   setLikedBooks={setLikedBooks}
//                   likedBooks={likedBooks}
//                   laterBooks={laterBooks}
//                   setViewMode={setViewMode}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <Pagination
//         totalSlides={totalSlides}
//         currentSlide={currentSlide}
//         onPageChange={onSlideChange}
//       />
      
//       </>
    
//   );
// };



// export default BookCarousel;

"use client";

import React from "react";
import Pagination from "@/components/ui/Pagenation";
import BookCard from "./BookCard";
import { Book } from "@/lib/types";

interface BookCarouselProps {
  books: Book[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onPlayBook: (book: Book, index: number) => void;
  onOpenDescription: (book: Book) => void;
  setViewMode: (item: string) => void;
  setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  laterBooks: Book[];
  likedBooks: Book[];
}

const booksPerSlide = 12; // 3 rows × 4 books

const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  currentSlide,
  onSlideChange,
  onPlayBook,
  onOpenDescription,
  setLikedBooks,
  setLaterBooks,
  likedBooks,
  laterBooks,
  setViewMode,
}) => {
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const getBooksForSlide = (slideIndex: number) => {
    const start = slideIndex * booksPerSlide;
    return books.slice(start, start + booksPerSlide);
  };

  return (
    <>
      {/* Carousel wrapper */}
      <div className="w-[95%] sm:w-[90%] max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center justify-center">
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className={`${
                slideIndex === currentSlide ? "block" : "hidden"
              } w-full`}
            >
              {/* Responsive grid of books */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {getBooksForSlide(slideIndex).map((book, index) => (
                  <BookCard
                    key={book.id ?? index}
                    book={book}
                    onPlay={() => onPlayBook(book, index)}
                    onMore={() => onOpenDescription(book)}
                    setLaterBooks={setLaterBooks}
                    setLikedBooks={setLikedBooks}
                    likedBooks={likedBooks}
                    laterBooks={laterBooks}
                    setViewMode={setViewMode}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onPageChange={onSlideChange}
      />
    </>
  );
};

export default BookCarousel;
